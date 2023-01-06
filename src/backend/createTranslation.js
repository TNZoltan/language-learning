import { submissionConstants } from "../constants/objects"
import { getSentenceEntityId, supabase, getInsertedStatus, refCountDirections } from "./helpers/database"
import { logDbError, logError } from "./helpers/logging"
import { valid, errorMessages } from "./helpers/validation"
import { postReqUpdateRefCount } from "./postReqUpdateRefCount"

export const createTranslation = async (req, res, user_id) => {
  const { translation, translation_structure } = req.body

  if (!translation)
    return res.status(400).send(errorMessages.somethingWrongMissing('Translation'))
  if (!valid.isSentence(translation))
    return res.status(400).send("Please make sure your sentence is gramatically correct. Starts with a capital letter and ends with a . ? or !")
  if (!valid.isValidStructure(translation_structure)) {
    return res.status(400).send(errorMessages.somethingWrong)
  }

  let sentenceEntityId = await getSentenceEntityId(req)

  if (!sentenceEntityId)
    return res.status(400).send(errorMessages.somethingWrongCantFindSentence)

  const alreadyInserted = await getInsertedStatus('translations', sentenceEntityId, user_id)

  if (alreadyInserted)
    return res.status(400).send(errorMessages.youSubmittedAlready('translation'))

  const translationExistsRes = await supabase
    .from('translations')
    .select('id')
    .eq('translation', translation)
    .eq('sentence_id', sentenceEntityId)

  const translationExists = translationExistsRes.data?.length > 0

  if (translationExists)
    return res.status(400).send('This translation already exists.')

  return supabase.from('translations').insert([{
    sentence_id: sentenceEntityId,
    translation,
    translation_structure,
    submitted_by: user_id
  }]).select().then((e) => {
    if (e.status === 201) {
      res.status(201).send({
        sentence_entity_id: e.data[0].sentence_id,
        id: e.data[0].id
      })
      return postReqUpdateRefCount(submissionConstants.TRANSLATIONS, refCountDirections.UP, sentenceEntityId)
    } else {
      logError(req, e)
      return res.status(e.status).send()
    }
  }).catch(e => {
    logDbError(req, e)
    return res.status(500).send()
  })
}