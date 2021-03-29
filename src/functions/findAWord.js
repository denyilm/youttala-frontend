/* eslint-disable no-unused-vars */
/*
const findAWord = (query, entries, wordlist) => {
  query = query.toLowerCase()
  if(wordlist.includes(query)){
    let result_arr = entries
      .filter(entry => entry.word === query || entry.bojningar_all.includes(query))

    return result_arr
    /*
    console.log('--------------')
    console.log(`Number of result(s) for the word "${query}": `, result_arr.length)
    let result_id = 1

    result_arr.forEach(result => {
      console.log('---------------')
      console.log('#', result_id)
      console.log('word: ',  result.word)
      console.log('alla formar:', result.bojningar_all)
      let i = 0
      result.meanings.forEach(meaning => {
        console.log('---------------')
        console.log(`#${i+1}. type: `, meaning.type)
        console.log('engelska: ', meaning.engelska)
        console.log('definition: ', meaning.definition)
        console.log('formar: ', meaning.bojningar)
        console.log('synonymer: ', meaning.synonymer)
        i++
      })
      console.log('>>>>>>>>>>>>>>>')
      console.log('               ')
      result_id++
    })
  } else {
    console.log('no such word in the database')
    return []
  }


}
*/

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

export default findAWord