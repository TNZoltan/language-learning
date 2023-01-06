import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAllSentences } from "../services/api";
import styles from './EditorSentences.module.scss';
import routes from "../constants/routes";
import Breadcrumbs from "../sections/Breadcrumbs";
import { saveSentenceStorage } from "../services/storage";
import { Button, Spread, Modal } from "../components";
import { useRouter } from "next/router";
import BrowseSentences from "../sections/BrowseSentences";

const EditorSentences = ({ content, nav }) => {
  const { segmentSlug } = nav
  const [existingSentences, setExistingSentences] = useState([])
  const [newSentences, setNewSentences] = useState([])
  const [isBrowsingNew, setIsBrowsingNew] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!segmentSlug) return
    fetchAllSentences('pl', segmentSlug).then(data => {
      if (data.length > 0) {
        setExistingSentences(data.filter(d => !!d.entity_id))
        setNewSentences(data.filter(d => !d.entity_id))
      }
    })
  }, [segmentSlug])

  const renderExistingSentence = (s) => (
    <Link key={s.id} href={routes.submissions.url({ ...nav, sentenceId: s.entity_id })}>
      <div className={styles.sentence}>
        <Spread>
          {s.sentence}
          <div className={styles.stats}>
            <div className={styles.stat}>
              Translations
              <div className={styles.statNumber}>
                {s.translations_count}
              </div>
            </div>
            <div className={styles.stat}>
              Images
              <div className={styles.statNumber}>
                {s.images_count}
              </div>
            </div>
            <div className={styles.stat}>
              Recordings
              <div className={styles.statNumber}>
                {s.audio_count}
              </div>
            </div>
          </div>
        </Spread>
      </div>
    </Link>
  )

  // TODO: Add sorting logic (most recent, least recent, most populated, least populated)
  return <>
    <Breadcrumbs nav={nav} depth={2} />
    <div className={styles.editorSentences}>
      <Spread>
        <Button
          variant="primary"
          onClick={() => setIsBrowsingNew(true)}
        >
          Add new sentence
        </Button>
        <Modal
          isOpen={isBrowsingNew}
          onClose={() => setIsBrowsingNew(false)}
        >
          <BrowseSentences
            onChoose={senObj => {
              saveSentenceStorage(senObj)
              router.push(routes.translationSubmitAlternative.url(
                { ...nav, baseSentenceId: senObj.id }
              ))
            }}
            sentences={newSentences}
            nav={nav}
            onClose={() => setIsBrowsingNew(false)}
          />
        </Modal>
      </Spread>
      <div className={styles.sentenceContainer}>
        {existingSentences.map(s => renderExistingSentence(s))}
      </div>
    </div>
  </>
}

export default EditorSentences