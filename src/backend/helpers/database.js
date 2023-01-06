import { createClient } from '@supabase/supabase-js';

const dbUrl = process.env.NEXT_PUBLIC_DB_API_ENDPOINT
const dbKey = process.env.SECRET_DB_API_KEY

export const supabase = createClient(dbUrl, dbKey)

export const getAccessToken = req => req.headers.authorization.split(' ')[1]

export const refCountDirections = {
  UP: 'increment',
  DOWN: 'decrement'
}

export const getIdFromQuery = obj => obj && obj.data && obj.data.length > 0 && obj.data[0].id

export const getSentenceEntityId = async (req) => {
  const { sentence_entity_id } = req.query
  const { sentence_id, language_slug } = req.body
  if (!sentence_entity_id) {
    const countryId = getIdFromQuery(await supabase.from('countries').select('id').eq('country', language_slug))
    return await supabase.from('sentence_entities').insert({
      sentence_id, country_id: countryId
    }).select().then(res => {
      if (res.data && res.data.length > 0) {
        return res.data[0].id
      } else return null
    })
  } else return sentence_entity_id
}

export const getInsertedStatus = async (table, sei, userId) => {
  const res = await supabase
    .from(table)
    .select('id')
    .eq('sentence_id', sei)
    .eq('submitted_by', userId)
  return res.data?.length > 0
}

export const getInsertedStatusAudio = async (ti, userId) => {
  const res = await supabase
    .from('translation_audio')
    .select('id')
    .eq('translation_id', ti)
    .eq('submitted_by', userId)
  return res.data?.length > 0
}

export const getUserLevel = async (userId) => {
  return await supabase.from('profiles').select('user_level').eq('id', userId).single().then(res => res.data.user_level)
}