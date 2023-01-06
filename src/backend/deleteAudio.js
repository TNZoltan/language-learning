import { submissionConstants } from "../constants/objects"
import { errorMessages, refCountDirections, supabase } from "./helpers/database"
import { logDbError, logError } from "./helpers/logging"
import { valid } from "./helpers/validation"
import { postReqUpdateRefCount } from "./postReqUpdateRefCount"

export const deleteAudio = async (req, res, userId) => {
  const { audio_id, sentence_entity_id } = req.query

  if (!valid.isId(audio_id)) {
    return res.status(400).send(errorMessages.somethingWrongCantFind('audio'))
  }

  return supabase.from('translation_audio').delete().match({
    id: audio_id,
    submitted_by: userId
  }).then((e) => {
    if (e.status === 204) {
      res.status(204).send()
      return postReqUpdateRefCount(submissionConstants.AUDIO, refCountDirections.DOWN, sentence_entity_id)
    } else {
      logError(req, e)
      return res.status(e.status).send()
    }
  }).catch(e => {
    logDbError(req, e)
    return res.status(500).send()
  })
}
