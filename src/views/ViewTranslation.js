import { useContext, useEffect, useState } from 'react'
import Link from 'next/link';
import { fetchAudio, deleteAudio, deleteTranslation } from '../services/api'
import SpotlightTranslation from '../sections/SpotlightTranslation';
import routes from '../constants/routes';
import { useRouter } from 'next/router'
import Breadcrumbs from '../sections/Breadcrumbs';
import { downloadFile } from '../services/supabase';
import styles from './ViewTranslation.module.scss';
import { Add, Pause, Play, Trash } from 'grommet-icons';
import cx from "classnames";
import { UserContext } from '../contexts/User';
import Voter from '../sections/Voter';
import { voteSorter } from '../services/functions';

const ViewTranslation = ({ content, nav }) => {
  const { sentenceId, translationId } = nav
  const [audio, setAudio] = useState([])
  const [indexPlaying, setIndexPlaying] = useState(-1)
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()
  const { user } = useContext(UserContext)

  const removeTranslation = () => {
    deleteTranslation(sentenceId, translationId).then((status) => {
      if (status === 204) {
        router.push(routes.sentences.url(nav))
      }
    })
  }

  useEffect(() => {
    if (!sentenceId || !translationId) return
    fetchAudio(sentenceId, translationId).then(data => {
      if (data) setAudio(data.sort(voteSorter))
      setLoaded(true)
    })
  }, [sentenceId, translationId])

  const removeSubmission = (submissionId) => {
    deleteAudio(sentenceId, translationId, submissionId).then((status) => {
      if (status === 204) {
        setAudio(prev => prev.filter(t => t.id !== submissionId))
      }
    })
  }

  const playAudio = (t, index) => {
    if (indexPlaying > -1) return
    downloadFile('audio-submissions', t.filename).then(blobUrl => {
      const audio = new Audio(blobUrl);
      setIndexPlaying(index)
      audio.play();
      audio.addEventListener('ended', e => setIndexPlaying(-1))
    })
  }

  const tileRenderer = (obj, index) => (
    <div key={index} className={styles.tile} onClick={() => playAudio(obj, index)}>
      <div className={styles.playContainer}>
        {indexPlaying === index ? <Pause color="white" /> : <Play color="white" />}
      </div>
      <div className={styles.voterContainer}>
        <Voter type="audio" submissionId={obj.id} initObj={obj} size="small" />
      </div>
    </div>
  )

  const renderUserTile = () => {
    const userAudio = audio.find(a => a.submitted_by === user.id)
    const index = audio.findIndex(a => a.submitted_by === user.id) + 1
    if (userAudio) {
      return (
        <div className={styles.yours}>
          {tileRenderer(userAudio, index)}
          <button className={styles.trashButton} onClick={() => removeSubmission(userAudio.id)}>
            <Trash />
          </button>
        </div>
      )
    } else if (loaded) {
      return (
        <div className={styles.yours}>
          <div className={cx(styles.plus, styles.tile)} onClick={() => router.push(routes.audioSubmit.url(nav))}>
            <Add size="large" />
          </div>
        </div>
      )
    } else {
      <div className={styles.yours}>
        <div className={cx(styles.skeletonTile, styles.tile)} />
      </div>
    }
  }

  return <>
    <Breadcrumbs depth={4} nav={nav} translationInvolved />
    <div className={styles.viewTranslation}>
      <SpotlightTranslation />
      <h2><u>Recordings</u></h2>
      <div className={styles.audioContainer}>
        {renderUserTile()}
        {audio.filter(a => a.submitted_by !== user.id).map(tileRenderer)}
      </div>
      {/* TODO: Confirmation dialog */}
      <a className={styles.deletionLink} onClick={removeTranslation}>Delete translation</a>
    </div>
  </>
}

export default ViewTranslation