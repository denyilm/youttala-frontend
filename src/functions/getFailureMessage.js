import getRandomWord from './getRandomWord'

const getFailureMessage = (query, text) => {
  let messageObj = {}
  let word = getRandomWord()
  let shownText = `${text}${query}, try '${word}'`
  //setShownSubtitles(shownText)
  messageObj.shownText = shownText
  let shownSubtitlesArr = shownText.split(/[\s\n]+/)
  //setShownSubtitlesArr(shownSubtitlesArr)
  messageObj.shownSubtitlesArr = shownSubtitlesArr
  return messageObj
}

export default getFailureMessage
