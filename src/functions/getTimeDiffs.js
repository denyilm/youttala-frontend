/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const getTimeDiffs = (wholeText, unSubbedPartArr, ms) => {
  let foundSubtitle
  let foundIndex
  let unSubbedIndex = unSubbedPartArr.findIndex(part => part[0] <= ms && ms <= part[1])
  let subbedIndex = wholeText.findIndex(subtitle => subtitle.miliSecondsArr[0] <= ms && ms <= subtitle.miliSecondsArr[1])
  try {
    if(unSubbedIndex !== -1){
      foundIndex = unSubbedIndex
      foundSubtitle = wholeText[foundIndex]
      let time_diff_1 = foundSubtitle.miliSecondsArr[0] - ms
      let time_diff_3 = foundSubtitle.miliSecondsArr[1] - ms
      return { foundIndex, time_diff_1, time_diff_3 }
    } else {
      if(subbedIndex === -1) {
        let foundIndex = null
        let time_diff_1 = null
        let time_diff_3 = null
        return { foundIndex, time_diff_1, time_diff_3 }
      }
      foundSubtitle = wholeText.find(subtitle => subtitle.miliSecondsArr[0] <= ms && ms <= subtitle.miliSecondsArr[1])
      foundIndex = wholeText.findIndex(subtitle => subtitle.timeStampAsText === foundSubtitle.timeStampAsText )
      let time_diff_3 = foundSubtitle.miliSecondsArr[1] - ms
      let time_diff_1 = 0
      return { foundIndex, time_diff_1, time_diff_3 }
    }
  } catch (error) {
    console.log('something went wrong')
    console.log(error)
  }
}

export default getTimeDiffs