import { getIdFromQuery, supabase } from "./helpers/database"
import { logDbError, logError } from "./helpers/logging"

export const getAllSegments = async (req, res) => {
  const { language_slug } = req.query

  const countryId = getIdFromQuery(await supabase.from('countries').select('id').eq('country', language_slug))

  return supabase
    .from('segments')
    .select('id, segment, segment_entities(id)')
    .eq('segment_entities.country_id', countryId)
    .then(result => {
      if (result.status === 200) {
        return res.json(result.data.map(d => ({
          id: d.segment_entities && d.segment_entities[0].id,
          name: d.segment
        })))
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