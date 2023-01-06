import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Providers from '../src/contexts';
import { fetchSentence, fetchTranslation } from '../src/services/api';
import { SelectedContext } from '../src/contexts/Selected';
import { isLoggedIn, UserContext } from '../src/contexts/User';
import { initAuthHeader, initUser, initProfile, sentenceFallbackAllowed } from './_app.functions';
import English from '../src/i18n/en.json';

import '../src/styles/globals.scss';
import { clearSentenceStorage, retrieveSentenceStorage } from '../src/services/storage';
import { supabase } from '../src/services/supabase';

const AppWrapper = ({ Component, pageProps }) => {
  const { user, setUser } = useContext(UserContext)
  const [authLoading, setAuthLoading] = useState(true)
  const router = useRouter()
  const [content, setContent] = useState(English)
  const { selected, setSelected } = useContext(SelectedContext)

  const initSentence = () => {
    if (router.query.sentence_id && (!selected || !selected.sentence)) {
      fetchSentence(router.query.sentence_id).then(data => {
        setSelected(prev => ({ ...prev, ...data }))
      })
    } else if (sentenceFallbackAllowed(router)) {
      setSelected(prev => ({ ...prev, ...retrieveSentenceStorage() }))
    } else clearSentenceStorage()
  }

  const initTranslation = () => {
    if (router.query.translation_id && (!selected || !selected.translation)) {
      fetchTranslation(router.query.sentence_id, router.query.translation_id).then(data => {
        setSelected(prev => ({ ...prev, ...data }))
      })
    }
    if (!router.query.translation_id && selected?.translation) setSelected(prev => ({ ...prev, translation: null }))
  }

  useEffect(() => {
    console.log(location)
    setAuthLoading(true)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setAuthLoading(false)
        return
      }
      if (location.pathname === '/' || location.pathname === '/signup') {
        location.href = '/editor'
        return
      }
      // Set up API calls
      initAuthHeader(session)
      // Save user globally
      initUser(session, setUser)
      // Page loading ready to go
      setAuthLoading(false)
      // Fetch and save user data globally
      initProfile(session, setUser)
    })
  }, [])

  useEffect(() => {
    if (router.isReady) {
      // Fetch and save sentence globally
      initSentence()
      // Fetch and save translation globally
      initTranslation()
    }
  }, [router])
  
  if (authLoading) return null
  if (!authLoading && !isLoggedIn(user) && (router.asPath !== '/' && router.asPath !== '/signup')) {
    router.push('/')
    return null
  }
  
  return (
    <Component
      content={content}
      nav={{
        languageSlug: 'pl',
        segmentSlug: router?.query?.segment_slug,
        sentenceId: router?.query?.sentence_id,
        baseSentenceId: router?.query?.base_id,
        translationId: router?.query?.translation_id
      }}
      {...pageProps}
    />
  )
}

const MyApp = (props) => {
  return (
    <Providers>
      <AppWrapper {...props} />
    </Providers>
  )
}

export default MyApp
