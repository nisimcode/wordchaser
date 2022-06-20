const wordsDictionary = require("./words_dictionary.json")
const vocabulary = {}
const rawVocabulary = []

for (const word of Object.keys(wordsDictionary)) {
  if (word.length > 1) {
    if (!(word[0]+word[1] in vocabulary)){
      vocabulary[word[0]+word[1]] = [word]
    } else {
      vocabulary[word[0]+word[1]].push(word)
    }
  }
  if (word.length === 3) {
    rawVocabulary.push(word)
  }
}

exports.vocabulary = vocabulary
exports.rawVocabulary = rawVocabulary