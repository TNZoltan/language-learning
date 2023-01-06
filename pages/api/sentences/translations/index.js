import { getAccessToken, getUserLevel, supabase } from '../../../../src/backend/helpers/database'
import handler from '../[sentence_entity_id]/translations/index'

export default async function redirect(req, res) {
  // COMPLETE REDIRECT
  switch (req.method) {
    case 'POST': return handler(req, res)
    default: return res.status(405).send()
  }
}