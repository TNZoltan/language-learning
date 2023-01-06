import { getAccessToken, supabase } from "../../../src/backend/helpers/database"

export default async function handler(req, res) {
  const accessToken = getAccessToken(req)
  const { data: auth } = await supabase.auth.getUser(accessToken)
  // No access to API
  if (auth.error) return res.status(auth.error.status).send(auth.error.message)

  switch (req.method) {
    case 'POST': {
      const { username, avatar_file } = req.body
      return supabase.from('profiles').upsert({
        id: auth.user.id,
        username,
        avatar_file,
        updated_at: new Date()
      }).select().then(e => res.send(e))
    }
    default: return res.status(405).send()
  }
}