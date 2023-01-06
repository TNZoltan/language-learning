const sentences = require('./bank_sentences')
const fs = require('fs')

let final = ''

Object.keys(sentences).forEach(key => {
  if (sentences[key].beginner.length > 0) final += `\n${key} - Beginner\n`
  sentences[key].beginner.forEach(i => {
    if (typeof i === 'string') {
      final += i + '\n'
    } else {
      final += i.s + '\n'
    }
  })
  if (sentences[key].intermediate.length > 0) final += `\n${key} - Intermediate \n`
  sentences[key].intermediate.forEach(i => {
    if (typeof i === 'string') {
      final += i + '\n'
    } else {
      final += i.s + '\n'
    }
  })
})
fs.writeFile("./sentence_entity_filler.txt", final, () => { }); 