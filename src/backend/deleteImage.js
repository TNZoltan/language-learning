import { submissionConstants } from "../constants/objects"
import { errorMessages, refCountDirections, supabase } from "./helpers/database"
import { logDbError, logError } from "./helpers/logging"
import { valid } from "./helpers/validation"
import { postReqUpdateRefCount } from "./postReqUpdateRefCount"

export const deleteImage = async (req, res, userId) => {
  const { image_id, sentence_entity_id  } = req.query

  if (!valid.isId(image_id)) {
    return res.status(400).send(errorMessages.somethingWrongCantFind('image'))
  }

  return supabase.from('images').delete().match({
    id: image_id,
    submitted_by: userId
  }).then((e) => {
    if (e.status === 204) {
      res.status(204).send()
      return postReqUpdateRefCount(submissionConstants.IMAGES, refCountDirections.DOWN, sentence_entity_id)
    } else {
      logError(req, e)
      return res.status(e.status).send()
    }
  }).catch(e => {
    logDbError(req, e)
    return res.status(500).send()
  })
}
