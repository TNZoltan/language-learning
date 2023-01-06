import { errorMessages, supabase } from "./helpers/database"
import { mappers } from "./helpers/validation"

export const getAllSubmissions = async (req, res, userId) => {
  const { sentence_entity_id } = req.query

  if (!sentence_entity_id) {
    return res.status(400).send(errorMessages.somethingWrongCantFind('sentence'))
  }

  const images = await supabase.from('images').select('id, filename, submitted_by, profiles:submitted_by(username, avatar_file)').eq('sentence_id', sentence_entity_id).limit(3)

  const translations = await supabase.from('translations').select('id, translation, translation_structure, submitted_by, profiles:submitted_by(username, avatar_file), translation_votes:translation_votes_translation_id_fkey(upvote, voted_by)').eq('sentence_id', sentence_entity_id)

  return res.status(200).send({
    images: images.data?.length > 0 && images.data.map(image => mappers.imageNoVotes(image)),
    translations: translations.data?.length > 0 && translations.data.map(translation => mappers.translation(translation, userId))
  })
}