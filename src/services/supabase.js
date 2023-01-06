import { createClient } from '@supabase/supabase-js';

const dbUrl = process.env.NEXT_PUBLIC_DB_API_ENDPOINT
const dbKey = process.env.NEXT_PUBLIC_DB_API_KEY

// TODO: Tokens don't get autorefreshed, upgrade supabase or use refresh token
export const supabase = createClient(dbUrl, dbKey)

export const getProfileData = async (id) => {
  return supabase.from('profiles').select(`username, avatar_file`).eq('id', id).single().then(res => res.data)
}

export const downloadFile = async (source, file) => {
  return await supabase.storage.from(source).download(file).then(res => {
    return URL.createObjectURL(res.data)
  })
}

export const uploadFile = async (destination, filePath, file) => {
  return supabase.storage.from(destination).upload(filePath, file)
}