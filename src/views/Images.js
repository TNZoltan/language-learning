import { useContext, useEffect, useState } from 'react'
import { deleteImage, fetchImages, submitImage } from '../services/api'
import styles from './Images.module.scss'
import SpotlightSentence from '../sections/SpotlightSentence'
import Breadcrumbs from '../sections/Breadcrumbs';
import { downloadFile, uploadFile } from '../services/supabase';
import Image from 'next/image';
import cx from 'classnames';
import { Add, Trash } from 'grommet-icons';
import { UserContext } from '../contexts/User';
import { FileSelector } from '../components';
import Voter from '../sections/Voter';
import { voteSorter } from '../services/functions';

const Images = ({ nav }) => {
  const { sentenceId } = nav
  const [images, setImages] = useState([])
  const [imageUpload, setImageUpload] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [ready, setReady] = useState(false)
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!sentenceId || images.length > 0) return
    fetchImages(sentenceId).then((data, i) => {
      if (data.length === 0) setLoaded(true)
      data.sort(voteSorter).map((row, j) => {
        downloadFile('image-submissions', row.filename).then(file => {
          setImages(prev => ([...prev, { ...row, file }]))
          if (j === data.length - 1) setLoaded(true)
        })
      })
    })
  }, [sentenceId])

  const removeSubmission = (submissionId) => {
    deleteImage(sentenceId, submissionId).then((status) => {
      if (status === 204) {
        setImages(prev => prev.filter(t => t.id !== submissionId))
      }
    })
  }

  const sendSubmission = () => {
    const extension = imageUpload.name.split('.').pop()
    const name = `${Math.random()}.${extension}`
    const filePath = `${name}`
    uploadFile('image-submissions', filePath, imageUpload).then(res => {
      if (!res.data) return
      submitImage(sentenceId, name).then(res => {
        if (res.status === 201) {
          downloadFile('image-submissions', res.data.filename).then(file =>
            setImages(prev => [...prev, { ...res.data, file }])
          )
        }
      })
    })

  }

  const renderUserTile = () => {
    const userImage = images.find(a => a.submitted_by === user.id)
    if (userImage) {
      return (
        <div className={styles.yours}>
          <div className={styles.tile}>
            <Image src={userImage.file} width={200} height={200} />
            <Voter type="image" submissionId={userImage.id} initObj={userImage} size="medium" />
          </div>
          <button className={styles.userButton} onClick={() => removeSubmission(userImage.id)}>
            <Trash />
          </button>
        </div>
      )
    } else if (loaded) {
      return (
        <div className={styles.yours}>
          <div
            className={cx(styles.plus, styles.tile)}
          >
            <FileSelector
              saveFileName={file => {
                setImageUpload(file)
                setReady(true)
              }}
              height={150}
              width={150}
            />
          </div>
          <button className={styles.userButton} onClick={sendSubmission} disabled={!ready}><Add /></button>
        </div>
      )
    } else {
      return (
        <div className={styles.yours}>
          <div className={cx(styles.skeletonTile, styles.tile)} />
        </div>
      )
    }
  }

  return <>
    <Breadcrumbs depth={4} extra={[{ text: 'Images' }]} nav={nav} />
    <div className={styles.images}>
      <SpotlightSentence disableCategories />
      <div className={styles.imagesContainer}>
        {renderUserTile()}
        {images.filter(a => a.submitted_by !== user.id).map((t, i) => {
          return (
            <div key={t.id} className={styles.tile}>
              <Image src={t.file} width={200} height={200} />
              <Voter type="image" submissionId={t.id} initObj={t} size="medium" />
            </div>
          )
        })}
      </div>
    </div>
  </>
}

export default Images