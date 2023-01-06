import { deleteTranslation } from "../../../../../../src/backend/deleteTranslation"
import { getTranslation } from "../../../../../../src/backend/getTranslation"
import { getAccessToken, getUserLevel, supabase } from "../../../../../../src/backend/helpers/database"

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
    case 'GET': return getTranslation(req, res)
    case 'DELETE': return deleteTranslation(req, res, auth.user.id)
    default: return res.status(405).send()
  }
}