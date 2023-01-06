import { getIdFromQuery, supabase } from "./helpers/database"
import { logDbError, logError } from "./helpers/logging"

export const getAllSentences = async (req, res) => {
  const { language_slug, segment_slug } = req.query

  const segmentId = getIdFromQuery(await supabase.from('segments').select('id').eq('segment', segment_slug))

  const countryId = getIdFromQuery(await supabase.from('countries').select('id').eq('country', language_slug))

  return supabase
    .from('sentences')
    .select('id, sentence, sentence_structure, sentence_entities(id, images_count, translations_count, audio_count)')
    .eq('segment_id', segmentId)
    .eq('sentence_entities.country_id', countryId)
    .then(result => {
      if (result.status === 200) {
        return res.json(result.data.map(d => ({
          id: d.id,
          entity_id: d.sentence_entities.length > 0 ? d.sentence_entities[0].id : undefined,
          sentence: d.sentence,
          sentence_structure: d.sentence_structure,
          images_count: d.sentence_entities.length > 0 ? d.sentence_entities[0].images_count : undefined,
          translations_count: d.sentence_entities.length > 0 ? d.sentence_entities[0].translations_count : undefined,
          audio_count: d.sentence_entities.length > 0 ? d.sentence_entities[0].audio_count : undefined
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