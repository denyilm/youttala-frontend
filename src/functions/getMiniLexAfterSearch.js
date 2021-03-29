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

/* eslint-disable eqeqeq */
function isEqualArr(arr1, arr2){
  let isEqual = true
  if(arr1.length != arr2.length){
    isEqual = false
  } else {
    for(let i = 0; i < arr1.length ; i++){
      if(arr1[i] != arr2[i]){
        isEqual = false
        break
      }
    }
  }
  return isEqual
}


//S-setMiniLex
const getMiniLexAfterSearch = (pickedWord, entries, wordlist) => {
  let miniLexObj = {}
  //setMiniShownMeanigIndex(0)
  miniLexObj.miniShownMeaningIndex = 0
  let result_arr = findAWord(pickedWord, entries, wordlist)
  //setMiniWordResults(result_arr)
  miniLexObj.miniWordResults = result_arr

  //
  if(pickedWord.endsWith('s') && result_arr.length === 0){
    let length = pickedWord.length
    let new_query = pickedWord.substring(0, length-1)
    pickedWord = new_query
    result_arr = findAWord(pickedWord, entries, wordlist)
    //setWordResults(result_arr)
    miniLexObj.miniWordResults = result_arr
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
    //setWordResults([])
    miniLexObj.miniWordResults = []
    return miniLexObj
  }

  //only the ones whose bojningar includes the query or the word is equal to the query
  let meanings_pre_filtered = meanings.filter(meaning => meaning.bojningar.includes(pickedWord) || meaning.word === pickedWord)

  //The followinng was needed because in the mini lex there was so many card with the same content
  let meanings_filtered = []
  meanings_pre_filtered.forEach(meaning => {
    if(meanings_filtered.findIndex(meaningFinal => isEqualArr(meaning.bojningar, meaningFinal.bojningar) && isEqualArr(meaning.engelska, meaningFinal.engelska)) === -1){
      meanings_filtered.push(meaning)
    }
  })

  //setMiniWordMeanings(meanings_filtered)
  miniLexObj.miniWordMeanings = meanings_filtered

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
  //setMiniWordTypes(types)
  miniLexObj.miniWordTypes = types
  //setMiniWordType(types[0].type)
  miniLexObj.miniWordType = types[0].type

  //build meanings_shown
  let meanings_shown = meanings_filtered.filter(meaning => meaning.type === types[0].type)
  //setMiniShownMeanigs(meanings_shown)
  miniLexObj.miniShownMeanings = meanings_shown
  return miniLexObj
}
//E-setMiniLex

export default getMiniLexAfterSearch