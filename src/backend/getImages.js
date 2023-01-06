import { supabase } from "./helpers/database"
import { mappers, valid, errorMessages } from "./helpers/validation"
import { logDbError, logError } from "./helpers/logging"

export const getImages = async (req, res, userId) => {
  const { sentence_entity_id } = req.query
  if (!valid.isId(sentence_entity_id))
    return res.status(400).send(errorMessages.somethingWrongCantFindSentence)

  return supabase.from('images').select('id, filename, submitted_by, profiles:submitted_by(username, avatar_file), image_votes:image_votes_image_id_fkey(upvote, voted_by)').eq('sentence_id', sentence_entity_id).then((result) => {
    if (result.status === 200) {
      return res.status(200).json(result.data.map(d => mappers.image(d, userId)))
    } else {
      logError(req, result)
      return res.status(result.status).send()
    }
  })
    .catch(e => {
      logDbError(req, e)
      return res.status(500).send()
    })
}