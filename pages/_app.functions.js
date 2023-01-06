import axios from 'axios';
import { downloadFile, getProfileData } from '../src/services/supabase';


export const initAuthHeader = (session) => {
  if (session) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${session.access_token}`
  }
}

export const initUser = (session, setUser) => {
  if (session) {
    setUser(() => session.user)
  }
}

export const initProfile = (session, setUser) => {
  if (session) {
    getProfileData(session.user.id).then(data => {
      if (!data) return
      downloadFile('avatars', data.avatar_file).then(blobUrl => {
        setUser(user => ({ ...user, profile: { ...data, avatar_url: blobUrl } }))
      })
    })
  }
}

export const sentenceFallbackAllowed = (router) => {
  const allowedPaths = ['/editor/[segment_slug]/translations/submit']
  return allowedPaths.includes(router.pathname)
}