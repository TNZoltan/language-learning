const sentenceStorageName = '_sntc_crt'

export const saveSentenceStorage = (sentenceObj) => {
  localStorage.setItem(sentenceStorageName, JSON.stringify(sentenceObj))
}

export const retrieveSentenceStorage = () => {
  const data = localStorage.getItem(sentenceStorageName)
  return data ? JSON.parse(data) : null
}

export const clearSentenceStorage = () => {
  localStorage.removeItem(sentenceStorageName)
}
