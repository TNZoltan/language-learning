import { supabase } from "./helpers/database"
import { errorMessages } from "./helpers/validation"
import { logDbError, logError } from "./helpers/logging"

export const getTranslation = async (req, res) => {
  const { translation_id } = req.query

  return supabase.from('translations').select('translation').eq('id', translation_id).single().then((result) => {
    if (result.status === 200) {
      if (result.data) {
        return res.status(200).send(result.data)
      } else return res.status(404).send(errorMessages.somethingWrongCantFind('translation'))
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