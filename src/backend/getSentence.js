import { supabase } from "./helpers/database"
import { errorMessages } from "./helpers/validation"
import { logDbError, logError } from "./helpers/logging"

export const getSentence = async (req, res) => {
  const { sentence_entity_id } = req.query

  return supabase.from('sentence_entities').select('sentences(sentence, sentence_structure)').eq('id', sentence_entity_id).then((result) => {
    if (result.status === 200) {
      if (result.data.length > 0) {
        return res.status(200).json(result.data[0].sentences)
      } else return res.status(404).send(errorMessages.somethingWrongCantFindSentence)
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