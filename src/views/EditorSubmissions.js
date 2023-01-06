import { useContext, useEffect, useState } from "react";
import { fetchAllSubmissions } from "../services/api";
import styles from './EditorSubmissions.module.scss';
import SpotlightSentence from "../sections/SpotlightSentence";
import routes from "../constants/routes";
import { useRouter } from "next/router"
import Breadcrumbs from "../sections/Breadcrumbs";
import { Add, Next } from "grommet-icons";
import { downloadFile } from "../services/supabase";
import { Button, PrintSentence } from "../components";
import { UserContext } from "../contexts/User";
import cx from "classnames";
import Voter from "../sections/Voter";
import { voteSorter } from "../services/functions";

const EditorSubmissions = ({ nav }) => {
  const { sentenceId } = nav
  const router = useRouter()
  const [images, setImages] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [translations, setTranslations] = useState(null)
  const [userUploaded, setUserUploaded] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!sentenceId) return
    fetchAllSubmissions(sentenceId).then(data => {
      // TODO: Throw error for empty translations
      setImages(data.images)
      setTranslations(data.translations.sort(voteSorter))
      setUserUploaded(data.translations.findIndex(t => t.submitted_by === user.id) > -1)
      setLoaded(true)
      if (data.images) {
        data.images.map(image => {
          downloadFile('image-submissions', image.filename).then(file => {
            setImageFiles(prev => ([...prev, file]))
          })

        })
      }
    })
  }, [sentenceId])

  const renderTranslations = () => {
    if (!translations) return <></>
    return (
      <>
        <div className={styles.mainTranslation} onClick={() => router.push(routes.viewTranslation.url({ ...nav, translationId: translations[0].id }))}>
          <div>
            <Voter type="translation" submissionId={translations[0].id} initObj={translations[0]} />
            <div className={styles.translation}><PrintSentence sen={translations[0].translation} struc={translations[0].translation_structure} /></div>
            <Next />
          </div>
        </div>
        {translations.slice(1).map(translation => (
          <div key={translation.id} className={styles.otherTranslations} onClick={() => router.push(routes.viewTranslation.url({ ...nav, translationId: translation.id }))}>
            <Voter type="translation" submissionId={translation.id} initObj={translation} />
            <div className={styles.translation}><PrintSentence sen={translation.translation} struc={translation.translation_structure} /></div>
            <Next />
          </div>
        ))}
        {!userUploaded && (
          <div className={cx(styles.otherTranslations, styles.newSentence)} onClick={() => router.push(routes.translationSubmit.url(nav))}>
            <Add />
          </div>
        )}
      </>
    )
  }

  const renderImages = () => {
    if (!loaded) return <></>
    const placeHoldersToRender = !images ? 3 : 3 - images.length
    return (
      <>
        {images && images.slice(0, 2).map((_, i) =>  <div key={i} className={styles.image} style={{ backgroundImage: `url(${imageFiles[i]})` }} />)}
        {placeHoldersToRender >= 1 && [...Array(placeHoldersToRender)].map((_, i) => <div key={i} className={styles.imagePlaceholder} />)}
        <div className={styles.plus} onClick={() => router.push(routes.images.url(nav))}>
          <Add size="large" />
        </div>
      </>
    )
  }

  return <>
    <Breadcrumbs nav={nav} depth={3} />
    <div className={styles.editorSubmissions}>
      <div style={{ display: 'flex' }}>
        <div className={styles.toBeNamed}>
          <SpotlightSentence />
        </div>
        <div className={styles.images} onClick={() => router.push(routes.images.url(nav))}>
          {renderImages()}
        </div>
      </div>
      {renderTranslations()}
    </div>
  </>
}

export default EditorSubmissions