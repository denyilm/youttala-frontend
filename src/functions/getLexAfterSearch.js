/* eslint-disable no-unused-vars */
const findAWord = (query, entries, wordlist) => {
  query = query.toLowerCase()
  if(wordlist.includes(query)){
    let result_arr = entries
      .filter(entry => entry.word === query || entry.bojningar_all.includes(query))

    return result_arr
  } else {
    console.log('no such word in the database')
    return []
  }
}

//S-setLexAfterSearc
const getLexAfterSearch = (query, entries, wordlist) => {
  let lexObj = {}
  //setShownMeanigIndex(0)
  lexObj.shownMeaningIndex = 0

  //console.log(query)

  let result_arr = findAWord(query, entries, wordlist)
  //setWordResults(result_arr)
  lexObj.wordResults = result_arr

  //
  if(query.endsWith('s') && result_arr.length === 0){
    let length = query.length
    let new_query = query.substring(0, length-1)
    query = new_query
    result_arr = findAWord(query, entries, wordlist)
    //setWordResults(result_arr)
    lexObj.wordResults = result_arr
  }
  //

  //build wordMeanings
  let meanings = []
  result_arr.forEach(result => {
    result.meanings.forEach(meaning => {
      if(meaning.engelska.length > 0){
        meaning.word = result.word
        meanings.push(meaning)
      }
    })
  })


  //break function if the meanings is empty tex: an
  if(meanings.length === 0){
    lexObj.wordResults = []
    return lexObj
  }

  //only the ones whose bojningar includes the query or the word is equal to the query
  let meanings_filtered = meanings.filter(meaning => meaning.bojningar.includes(query) || meaning.word === query)
  //setWordMeanings(meanings_filtered)
  lexObj.wordMeanings = meanings_filtered

  //build wordTypes
  let types = []
  meanings_filtered.forEach(meaning => {
    if(meaning.engelska.length > 0) {
      if(types.findIndex(type_already_in => type_already_in.type === meaning.type) === -1){
        let type_json = { 'type': meaning.type, 'n': 1 }
        types.push(type_json)
      } else {
        let index_of_type = types.findIndex(type_already_in => type_already_in.type === meaning.type)
        let updated_type_json = types[index_of_type]
        let n = updated_type_json.n
        updated_type_json.n = n+1
        types.splice(index_of_type, 1, updated_type_json)
      }
    }
  })

  types.sort()
  //setWordTypes(types)
  lexObj.wordTypes = types
  //setWordType(types[0].type)
  lexObj.wordType = types[0].type

  //build meanings_shown
  let meanings_shown = meanings_filtered.filter(meaning => meaning.type === types[0].type)
  //setShownMeanigs(meanings_shown)
  lexObj.shownMeanings = meanings_shown
  return lexObj
}
//E-setLexAfterSearch

export default getLexAfterSearch