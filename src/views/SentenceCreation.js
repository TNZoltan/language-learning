import { useState } from 'react'
import { alternativeSubmitTranslation } from '../services/api'
import SpotlightSentence from '../sections/SpotlightSentence';
import { useRouter } from "next/router"
import routes from '../constants/routes';
import Breadcrumbs from '../sections/Breadcrumbs';
import SentenceGenerator from '../sections/SentenceGenerator';

const SentenceCreation = ({ content, nav }) => {
  const [translationInput, setTranslationInput] = useState('')
  const router = useRouter()

  const sendSubmission = (translationStructure) => {
    alternativeSubmitTranslation(nav.baseSentenceId, nav.languageSlug, translationInput, translationStructure).then(data => {
      if (data.status === 201 && data.data?.sentence_entity_id) {
        router.push(routes.submissionSuccess.url({ ...nav, sentenceId: data.data.sentence_entity_id, translationId: data.data.id }))
      }
    })
  }

  return <>
    <Breadcrumbs depth={3} nav={nav} />
    <SpotlightSentence />
    <SentenceGenerator sentence={translationInput} setSentence={setTranslationInput} onSubmit={obj => sendSubmission(obj)} />
  </>
}

export default SentenceCreation