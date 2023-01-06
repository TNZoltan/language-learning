import { useEffect, useState } from 'react'
import { fetchAllSubmissions, submitTranslation } from '../services/api'
import SpotlightSentence from '../sections/SpotlightSentence';
import { useRouter } from "next/router"
import routes from '../constants/routes';
import Breadcrumbs from '../sections/Breadcrumbs';
import SentenceGenerator from '../sections/SentenceGenerator';


const SubmitTranslation = ({ content, nav }) => {
  const { sentenceId } = nav
  const [translationInput, setTranslationInput] = useState('')
  const [existingTranslations, setExistingTranslations] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchAllSubmissions(sentenceId).then(data => {
      setExistingTranslations(data.translations)
    })
  }, [])

  const sendSubmission = (translationStructure) => {
    submitTranslation(sentenceId, translationInput, translationStructure).then(status => {
      if (status === 201) {
        router.push(routes.submissions.url(nav))
      }
    })
  }

  return <>
    <Breadcrumbs depth={4} extra={[{ text: 'Submit new translation' }]} nav={nav} />
    <SpotlightSentence />
    <SentenceGenerator sentence={translationInput} setSentence={setTranslationInput} onSubmit={obj => sendSubmission(obj)} existingSentences={existingTranslations.map(t => t.translation)} />
  </>
}

export default SubmitTranslation