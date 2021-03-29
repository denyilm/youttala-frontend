/* eslint-disable no-unused-vars */
import convertToMs from './convertToMs'
import getTimeDiffs from './getTimeDiffs'

const synchSubtitles = (
  submitted,
  youTubeLinks,
  subTimeoutId_1,
  subTimeoutId_3,
  ref,
  wholeText,
  unSubbedPartArr,
  setTimeDiff1,
  setTimeDiff3,
  setSubtitleIndex,
  setSubmitted,
  setShowSubtitle,
  setShownSubtitles,
  setShownSubtitlesArr,
  setSubTimeoutId_1,
  setSubTimeoutId_3,
  setMiniWordResults,
) => {
  if(submitted && youTubeLinks.length > 0){
    window.clearTimeout(subTimeoutId_1)
    //window.clearTimeout(subTimeoutId_2)
    window.clearTimeout(subTimeoutId_3)
    setMiniWordResults([])
    let seeThis = ref.current.getCurrentTime()
    let ms = convertToMs(seeThis)
    let timeDiffs = getTimeDiffs(wholeText, unSubbedPartArr, ms)
    setTimeDiff1(timeDiffs.time_diff_1)
    setTimeDiff3(timeDiffs.time_diff_3)
    setSubtitleIndex(timeDiffs.foundIndex)
    let index = timeDiffs.foundIndex
    if(index >= wholeText.length || timeDiffs.foundIndex === null){
      setSubmitted(false)
      setShowSubtitle(false)
      setTimeDiff1(null)
      setTimeDiff3(null)
    } else {
      setShowSubtitle(true)

      let timeout_1 = setTimeout(() => {
        setShownSubtitles(wholeText[index].subtitle.join('\n'))
        setShownSubtitlesArr(wholeText[index].subtitle.join('\n').split(/[\s\n]+/))
      }, timeDiffs.time_diff_1)
      setSubTimeoutId_1(timeout_1)

      if(timeDiffs.time_diff_1 > 500) {
        setShownSubtitles('...')
        setShownSubtitlesArr(['...'])
      }

      let timeout_3 = setTimeout(() => {
        setSubtitleIndex(index+1)
      }, timeDiffs.time_diff_3)
      setSubTimeoutId_3(timeout_3)

    }
  } else {
    //console.log('no submission')
    return null
  }
}

export default synchSubtitles