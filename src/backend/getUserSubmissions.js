import { errorMessages, supabase } from "./helpers/database"
import { mappers, valid } from "./helpers/validation"

export const getUserSubmissions = async (req, res, user_id) => {
  const { sentence_entity_id } = req.query

  if (!sentence_entity_id) {
    return res.status(400).send(errorMessages.somethingWrongCantFind('sentence'))
  }

  if (!valid.isUuid(user_id))
    return res.status(400).send(errorMessages.userMissing)

  const image = await supabase.from('images').select('id, filename, profiles(username, avatar_file)').eq('sentence_id', sentence_entity_id).eq('submitted_by', user_id).single()

  const audio = await supabase.from('translation_audio').select('id, filename, translations(id), profiles(username, avatar_file)').eq('translations.sentence_id', sentence_entity_id).eq('submitted_by', user_id)

  const translation = await supabase.from('translations').select('id, translation, profiles(username, avatar_file)').eq('sentence_id', sentence_entity_id).eq('submitted_by', user_id).single()

  
  return res.status(200).send({
    image: image.data && mappers.media(image.data),
    audio: audio.data?.length > 0 && mappers.media(audio.data[0]),
    translation: translation.data && mappers.translation(translation.data)
  })
}