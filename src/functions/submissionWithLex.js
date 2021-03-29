/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
//S-submissionWithLex
import subtitleService from '../services/subtitles'
import buildYouTubeLinkArray from './buildYouTubeLinkArray'
import contains from './contains'

/*
const submissionWithLex = async(query, appReady, subtitles) => {
  const submissionObj = {}
  let youTubeLinkList = []
  let videoIDsThatContain = []
  if(query !== ''){
    try {
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
        await subtitleService.getSubtitleResults(query)
          .then(response => {
            youTubeLinkList = response.youTubeLinkList
            videoIDsThatContain = response.videoIDsThatContain
            submissionObj.youTubeLinkList = youTubeLinkList
            //return submissionObj
          })
      }
    } catch (error) {
      if(youTubeLinkList.length === 0) {
        //resetQuery( query, 'nothing found for ' )
        submissionObj.query = query
        submissionObj.failMessage = 'nothing found for '
        //setSubmitted(false)
        submissionObj.submitted = false
      }
    }
  } else {
    //resetQuery( query, 'please type something' )
    //setSubmitted(false)
    submissionObj.query = query
    submissionObj.failMessage = 'please type something'
    //setSubmitted(false)
    submissionObj.submitted = false
  }
  return submissionObj
}
//E-submisstionWithLex
*/

const submissionWithLex = async(query, appReady, subtitles) => {
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
      await subtitleService.getSubtitleResults(query)
        .then(response => {
          youTubeLinkList = response.youTubeLinkList
          //videoIDsThatContain = response.videoIDsThatContain
          submissionObj.youTubeLinkList = youTubeLinkList
        })
    }
    return submissionObj
  } else {
    submissionObj.youTubeLinkList = []
    return submissionObj
  }
}
//E-submisstionWithLex

export default submissionWithLex