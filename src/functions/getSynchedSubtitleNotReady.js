/* eslint-disable no-unused-vars */
import convertWholeText from './convertWholeText'

const getUnsubbedPart = (convertedWholeText) => {
  let wholeTextArr = convertedWholeText
  let arr = [[0, wholeTextArr[0].miliSecondsArr[0]]]
  for(let i = 0 ; i < wholeTextArr.length - 1 ; i++){
    let arrOfarr = [wholeTextArr[i].miliSecondsArr[1], wholeTextArr[i+1].miliSecondsArr[0]]
    arr.push(arrOfarr)
  }
  return arr
}

//"timeStampAsText"

const getSynchedSubtitleNotReady = (youTubeLinkList, i) => {
  let synchedSubtitleObj = {}
  let convertedWholeText = convertWholeText(youTubeLinkList[i].text)
  let subtitleIndex = convertedWholeText.findIndex(subtitle => subtitle.timeStampAsText === youTubeLinkList[i].timeStamp)
  synchedSubtitleObj.wholeText = convertedWholeText
  synchedSubtitleObj.unSubbedPart = getUnsubbedPart(convertedWholeText)
  synchedSubtitleObj.subtitleIndex = subtitleIndex
  return synchedSubtitleObj
}

export default getSynchedSubtitleNotReady