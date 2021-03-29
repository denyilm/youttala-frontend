/* eslint-disable no-unused-vars */
const getUnsubbedPart = (youTubeLinkList, i) => {
  let wholeTextArr = youTubeLinkList[i].wholeText
  let arr = [[0, wholeTextArr[0].miliSecondsArr[0]]]
  for(let i = 0 ; i < wholeTextArr.length - 1 ; i++){
    let arrOfarr = [wholeTextArr[i].miliSecondsArr[1], wholeTextArr[i+1].miliSecondsArr[0]]
    arr.push(arrOfarr)
  }
  return arr
}

const getSynchedSubtitle = (youTubeLinkList, i) => {
  let synchedSubtitleObj = {}
  synchedSubtitleObj.wholeText = youTubeLinkList[i].wholeText
  synchedSubtitleObj.unSubbedPart = getUnsubbedPart(youTubeLinkList, i)
  synchedSubtitleObj.subtitleIndex = youTubeLinkList[i].subtitleIndex
  return synchedSubtitleObj
}

export default getSynchedSubtitle