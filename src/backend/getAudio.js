import { supabase } from "./helpers/database"
import { mappers, valid, errorMessages } from "./helpers/validation"
import { logDbError, logError } from "./helpers/logging"

export const getAudio = async (req, res, userId) => {
  const { translation_id } = req.query
  if (!valid.isId(translation_id))
    return res.status(400).send(errorMessages.somethingWrongCantFind('translation'))

  return supabase.from('translation_audio').select('id, filename, submitted_by, profiles:submitted_by(username, avatar_file), audio_votes:audio_votes_audio_id_fkey(upvote, voted_by)').eq('translation_id', translation_id).then((result) => {
    if (result.status === 200) {
      return res.status(200).json(result.data.map(d => mappers.audio(d, userId)))
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