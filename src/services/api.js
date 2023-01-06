import axios from 'axios';

const returnBody = res => res.data
const returnStatus = res => res.status

export const fetchAllSegments = async (ls) => axios.get('http://localhost:3000/api/segments/' + ls).then(returnBody)
export const fetchAllSentences = async (ls, sl) => axios.get(`http://localhost:3000/api/segments/${ls}/${sl}`).then(returnBody)

export const fetchSentence = async (sei) => axios.get(`http://localhost:3000/api/sentences/${sei}`).then(returnBody)
export const fetchTranslation = async (sei, ti) =>  axios.get(`http://localhost:3000/api/sentences/${sei}/translations/${ti}`).then(returnBody)

export const fetchSubmissionsByUser = async (sei) => axios.get(`http://localhost:3000/api/get-submissions?sentence_entity_id=${sei}`).then(returnBody)
export const fetchAllSubmissions = async (sei) => axios.get(`http://localhost:3000/api/sentences/${sei}/all`).then(returnBody)

export const fetchTranslations = async (sei) => axios.get(`http://localhost:3000/api/sentences/${sei}/translations`).then(returnBody)
export const fetchImages = async (sei) => axios.get(`http://localhost:3000/api/sentences/${sei}/images`).then(returnBody)
export const fetchAudio = async (sei, ti) => axios.get(`http://localhost:3000/api/sentences/${sei}/translations/${ti}/audio`).then(returnBody)

export const deleteTranslation = async (sei, si) => axios.delete(`http://localhost:3000/api/sentences/${sei}/translations/${si}`).then(returnStatus)
export const deleteImage = async (sei, si) => axios.delete(`http://localhost:3000/api/sentences/${sei}/images/${si}`).then(returnStatus)
export const deleteAudio = async (sei, ti, si) => axios.delete(`http://localhost:3000/api/sentences/${sei}/translations/${ti}/audio/${si}`).then(returnStatus)

export const submitTranslation = async (sei, translation, translation_structure) => {
  return axios.post(`http://localhost:3000/api/sentences/${sei}/translations`, {
    translation: translation.trim().replace(/ +(?= )/g,''),
    translation_structure
  }).then(returnStatus)
}

export const alternativeSubmitTranslation = async (baseSentenceId, language_slug, translation, translation_structure) => {
  return axios.post(`http://localhost:3000/api/sentences/translations`, {
    sentence_id: baseSentenceId,
    language_slug,
    translation: translation.trim().replace(/ +(?= )/g,''),
    translation_structure
  })
}

export const submitImage = async (sei, filename) => {
  return axios.post(`http://localhost:3000/api/sentences/${sei}/images`, {
    filename
  })
}

export const submitAudio = async (sei, ti, filename) => {
  return axios.post(`http://localhost:3000/api/sentences/${sei}/translations/${ti}/audio`, {
    filename
  }).then(returnStatus)
}

export const updateProfileData = async (username, avatar_file) => {
  return axios.post(`http://localhost:3000/api/profile`, {
    username,
    avatar_file
  }).then(returnStatus)
}

export const putVote = async (type, submission_id, upvote) => {
  return axios.put(`http://localhost:3000/api/vote/${type}`, {
    submission_id,
    upvote
  }).then(returnStatus)
}
