import { createTranslation } from "../../../../../src/backend/createTranslation"
import { getTranslations } from "../../../../../src/backend/getTranslations"
import { getAccessToken, getUserLevel, supabase } from "../../../../../src/backend/helpers/database"

export default async function handler(req, res) {
  const accessToken = getAccessToken(req)
  const { data: auth } = await supabase.auth.getUser(accessToken)
  // No access to API
  if (auth.error) return res.status(auth.error.status).send(auth.error.message)

  // No access to editor endpoints
  const userLevel = await getUserLevel(auth.user.id)
  if (userLevel === 'user') {
    return res.status(401).send()
  }

  switch (req.method) {
    case 'POST': return createTranslation(req, res, auth.user.id)
    case 'GET': return getTranslations(req, res)
    default: return res.status(405).send()
  }
}