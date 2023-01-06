import { submissionConstants } from "../constants/objects"
import { supabase, getInsertedStatus, refCountDirections } from "./helpers/database"
import { logDbError, logError } from "./helpers/logging"
import { errorMessages } from "./helpers/validation"
import { postReqUpdateRefCount } from "./postReqUpdateRefCount"

export const createImage = async (req, res, user_id) => {
  const { sentence_entity_id } = req.query
  const { filename } = req.body

  if (!filename)
    return res.status(400).send(errorMessages.somethingWrong)
  if (!sentence_entity_id)
    return res.status(400).send(errorMessages.somethingWrongCantFindSentence)

  const alreadyInserted = await getInsertedStatus('images', sentence_entity_id, user_id)

  if (alreadyInserted)
    return res.status(400).send(errorMessages.youSubmittedAlready('image'))

  return supabase.from('images').insert([{
    sentence_id: sentence_entity_id,
    filename,
    submitted_by: user_id
  }]).select().then((e) => {
    if (e.status === 201) {
      res.status(201).send(e.data[0])
      return postReqUpdateRefCount(submissionConstants.IMAGES, refCountDirections.UP, sentence_entity_id)
    } else {
      logError(req, e)
      return res.status(e.status).send()
    }
  }).catch(e => {
    logDbError(req, e)
    return res.status(500).send()
  })
}