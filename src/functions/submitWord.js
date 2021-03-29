/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
//S-submissionWithLex
import subtitleService from '../services/subtitles'
import buildYouTubeLinkArray from './buildYouTubeLinkArray'
import contains from './contains'

const submitWord = async(query, appReady, subtitles, setFetchReady) => {
  const submissionObj = {}
  let youTubeLinkList = []
  let videoIDsThatContain = []
  if(query !== ''){
    if(appReady){
      subtitles.forEach(subtitle => {
        if(contains(query, subtitle.text)){
          videoIDsThatContain.push(subtitle.videoId)
        }
      })
      youTubeLinkList = buildYouTubeLinkArray(query, videoIDsThatContain, subtitles)
      submissionObj.youTubeLinkList = youTubeLinkList
      submissionObj.query = query.toLowerCase()
      return submissionObj
    } else {
      await subtitleService.getSubtitleResults(query.toLowerCase())
        .then(response => {
          youTubeLinkList = response.youTubeLinkList
          //videoIDsThatContain = response.videoIDsThatContain
          //console.log(youTubeLinkList)
          submissionObj.youTubeLinkList = youTubeLinkList
        })
      setFetchReady(true)
    }
    return submissionObj
  } else {
    submissionObj.youTubeLinkList = []
    return submissionObj
  }
}
//E-submisstionWithLex

export default submitWord