import { supabase } from "./helpers/database"
import { errorMessages, valid } from "./helpers/validation"
import { logDbError, logError } from "./helpers/logging"

const types = ['image', 'translation', 'audio']

export const putVote = async (req, res, userId) => {
  const { type } = req.query
  const { submission_id, upvote } = req.body

  if (!valid.isId(submission_id)) {
    return res.status(400).send(errorMessages.somethingWrongCantFind('submission'))
  }

  if (!types.indexOf(type) === -1) {
    return res.status(400).send(errorMessages.somethingWrong())
  }

  if (upvote !== false && !upvote) {
    return supabase.from(`${type}_votes`).delete().match({ [`${type}_id`]: submission_id, voted_by: userId }).then(e => {
      return res.status(e.status).send()
    })
  } else if (!valid.isBoolean(upvote)) {
    return res.status(400).send(errorMessages.somethingWrong())
  } else {
    return supabase.from(`${type}_votes`).upsert({
      [`${type}_id`]: submission_id, 
      voted_by: userId,
      upvote,
      updated_at: new Date().toUTCString()
    }).then((e) => {
      return res.status(e.status).send()
    })
    .catch(e => {
      logDbError(req, e)
      return res.status(500).send()
    })
  }
}