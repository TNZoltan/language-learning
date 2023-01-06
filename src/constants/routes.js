/*
Breadcrumbs:
Polish / Shop / Can you pass... / Audio / Submit
Polish / Shop / Do you have... / Translations
Hungarian / Shop / You won't believe... / 
Polish / Home / Can you pass... / Create sentence
Turkish / Home / The door is... / Image
[lang] / [segment] / [sentence] 
Depth 1 / Depth 2 / Depth 3 / 

Routes:
/
/profile
/signup
/ (segments)
/editor/home (sentences)
/editor/home/3 (submissions)
/editor/home/3/translations (pair submissions)
/editor/home/3/translations/submit (submit)
/editor/home/translations/submit (submit without entity)
/editor/success (submission success)
*/

const routes = {
  login: {
    url: '/'
  },
  editorHome: {
    url: '/editor'
  },
  profile: {
    url: '/profile'
  },
  signup: {
    url: '/signup'
  },
  sentences: {
    url: navObj => `/editor/${navObj.segmentSlug}`
  },
  submissions: { 
    url: navObj => `/editor/${navObj.segmentSlug}/${navObj.sentenceId}`
  },
  translationSubmit: {
    url: navObj => `/editor/${navObj.segmentSlug}/${navObj.sentenceId}/translations/submit`
  },
  viewTranslation: {
    url: navObj => `/editor/${navObj.segmentSlug}/${navObj.sentenceId}/translations/${navObj.translationId}`
  },
  audioSubmit: {
    url: navObj => `/editor/${navObj.segmentSlug}/${navObj.sentenceId}/translations/${navObj.translationId}/audio/submit`
  },
  images: {
    url: navObj => `/editor/${navObj.segmentSlug}/${navObj.sentenceId}/images`
  },
  imageSubmit: {
    url: navObj => `/editor/${navObj.segmentSlug}/${navObj.sentenceId}/images/submit`
  },
  submissionSuccess: {
    url: (navObj) => `/editor/${navObj.segmentSlug}/${navObj.sentenceId}/translations/${navObj.translationId}/success`
  },
  translationSubmitAlternative: {
    url: navObj => `/editor/${navObj.segmentSlug}/translations/submit?base_id=${navObj.baseSentenceId}`
  }
}

export default routes