import { errorMessages, supabase } from "./helpers/database"
import { mappers, valid } from "./helpers/validation"
import { logDbError, logError } from "./helpers/logging"

export const getTranslations = async (req, res) => {
  const { sentence_entity_id } = req.query
  if (!valid.isId(sentence_entity_id))
    return res.status(400).send(errorMessages.somethingWrongCantFindSentence)

  return supabase.from('translations').select('id, translation, submitted_by, profiles(username, avatar_file)').eq('sentence_id', sentence_entity_id).then((result) => {
    if (result.status === 200) {
      return res.status(200).json(result.data.map(d => mappers.translation(d)))
    } else  {
      logError(req, result)
      return res.status(result.status).send()
    }
  })
  .catch(e => {
    logDbError(req, e)
    return res.status(500).send()
  })
}