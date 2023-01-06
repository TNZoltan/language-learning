const categories = `['obj', 'loc', 'time', 'verb', 'verp', 'verc', 'vera', 'adj', 'phr']`

export const valid = {
  isId: (id) => !isNaN(id) || /^\d+$/.test(id),
  isUuid: (id) => id.length && id.length === 36,
  isSentence: (s) => {
    return s.length > 0
      && s[0] !== ' ' && s[s.length - 1] !== ' '
      && s[0] == s[0].toUpperCase()
      && !s.includes('  ')
  },
  isBoolean: val => val === true || val === false,
  isDigits: val => /^\d+$/.test(val),
  isValidStructure: arr => {
    if (!(arr instanceof Array)) return false
    if (arr.length === 0) return false
    for (let i in arr) {
      const keys = Object.keys(arr[i])
      if (keys.length > 2) return false
      if (!(!isNaN(arr[i].at) || (!isNaN(arr[i].at[0]) && !isNaN(arr[i].at[1])))) return false
      if (!categories.includes(arr[i].is)) return false
    }
    return true
  }
}

export const errorMessages = {
  somethingWrong: 'Something went wrong with your request.',
  somethingWrongCantFind: (what) => `Something went wrong. We can't find this ${what}.`,
  somethingWrongCantFindSentence: `Something went wrong. We can't find this sentence.`,
  somethingWrongMissing: (what) => `Something went wrong. ${what} is missing.`,
  youSubmittedAlready: (what) => `You have already submitted a(n) ${what} for this sentence.`
}

export const mappers = {
  translation: (source, userId) => {
    return {
      id: source.id,
      translation: source.translation,
      translation_structure: source.translation_structure,
      submitted_by: source.submitted_by,
      approved: source.translation_votes.reduce((acc, cur) => acc += cur.upvote === true, 0),
      rejected: source.translation_votes.reduce((acc, cur) => acc += cur.upvote === false, 0),
      userVote: source.translation_votes.find(v => v.voted_by === userId)?.upvote
    }
  },
  audio: (source, userId) => ({
    id: source.id,
    filename: source.filename,
    submitted_by: source.submitted_by,
    approved: source.audio_votes.reduce((acc, cur) => acc += cur.upvote === true, 0),
    rejected: source.audio_votes.reduce((acc, cur) => acc += cur.upvote === false, 0),
    userVote: source.audio_votes.find(v => v.voted_by === userId)?.upvote
  }),
  image: (source, userId) => ({
    id: source.id,
    filename: source.filename,
    submitted_by: source.submitted_by,
    approved: source.image_votes.reduce((acc, cur) => acc += cur.upvote === true, 0),
    rejected: source.image_votes.reduce((acc, cur) => acc += cur.upvote === false, 0),
    userVote: source.image_votes.find(v => v.voted_by === userId)?.upvote
  }),
  imageNoVotes: (source) => ({
    id: source.id,
    filename: source.filename,
    submitted_by: source.submitted_by
  })
}