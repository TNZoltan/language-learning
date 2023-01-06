import { submissionConstants } from "../constants/objects"
import { supabase, getInsertedStatusAudio, refCountDirections } from "./helpers/database"
import { logDbError, logError } from "./helpers/logging"
import { valid, errorMessages } from "./helpers/validation"
import { postReqUpdateRefCount } from "./postReqUpdateRefCount"

export const createAudio = async (req, res, user_id) => {
  const { sentence_entity_id, translation_id } = req.query
  const { filename } = req.body

  if (!filename)
    return res.status(400).send(errorMessages.somethingWrong)
  if (!valid.isId(translation_id))
    return res.status(400).send(errorMessages.somethingWrongCantFind('translation'))

  const alreadyInserted = await getInsertedStatusAudio(translation_id, user_id)

  if (alreadyInserted)
    return res.status(400).send(errorMessages.youSubmittedAlready('recording'))

  return supabase.from('translation_audio').insert([{
    translation_id: translation_id,
    filename,
    submitted_by: user_id
  }]).select().then((e) => {
    if (e.status === 201) {
      res.status(201).send()
      return postReqUpdateRefCount(submissionConstants.AUDIO, refCountDirections.UP, sentence_entity_id)
    } else {
      logError(req, e)
      return res.status(e.status).send()
    }
  }).catch(e => {
    logDbError(req, e)
    return res.status(500).send()
  })
}