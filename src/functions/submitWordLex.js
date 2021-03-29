/* eslint-disable no-unused-vars */
import subtitleService from '../services/subtitles'
import getLexAfterSearch from './getLexAfterSearch'

const submitWordLex = async(query, appReady, entries, wordlist) => {
  let submissionObj = {}
  if(query !== ''){
    if(appReady){
      let lexObj = getLexAfterSearch(query.toLowerCase(), entries, wordlist)
      submissionObj = lexObj
      //console.log(submissionObj)
      return submissionObj
    } else {
      await subtitleService.getWordResults(query.toLowerCase())
        .then( response => {
          submissionObj = response
        }
        )
      return submissionObj
    }
  } else {
    return { wordResults: [] }
  }
}

export default submitWordLex