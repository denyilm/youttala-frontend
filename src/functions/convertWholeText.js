//S-onvertArrayTimeIntoSeconds
function convertArrayTimeIntoSeconds(arr){
  return parseInt(arr[0])*3600 + parseInt(arr[1])*60 + parseInt(arr[2])
}
//E-onvertArrayTimeIntoSeconds

//S-convertArrayTimeIntoMiliSeconds
function convertArrayTimeIntoMiliSeconds(arr){
  return parseInt(convertArrayTimeIntoSeconds(arr.slice(0,3)))*1000 + parseInt(arr[3])
}
//E-convertArrayTimeIntoMiliSeconds

const convertWholeText = (wholeText) => {
  let newWholeText = []
  let l = wholeText.length

  for(let i = 0 ; i < l ; i++){
    let newLine = {}
    if(wholeText[i].includes('-->')){
      newLine.timeStampAsText = wholeText[i]
      let timeStampArr = wholeText[i].split(' --> ')
      let secondsArr = []
      let miliSecondsArr = []
      timeStampArr.forEach(stamp => {
        let hour = stamp.substring(0,2)
        let minutes = stamp.substring(3,5)
        let seconds = stamp.substring(6,8)
        let miliSeconds = stamp.substring(9,12)
        secondsArr.push(convertArrayTimeIntoSeconds([hour, minutes, seconds]))
        miliSecondsArr.push(convertArrayTimeIntoMiliSeconds([hour, minutes, seconds, miliSeconds]))
      })
      newLine.secondsArr = secondsArr
      newLine.miliSecondsArr = miliSecondsArr
      let subtitleBetweenTwoStamps = []
      //let j = i+1
      for(let j = i + 1 ; j < l ; j++){
        if(wholeText[j].includes('-->')){
          break
        }
        subtitleBetweenTwoStamps.push(wholeText[j])
      }
      newLine.subtitle = subtitleBetweenTwoStamps
    }

    if(Object.keys(newLine).length > 0){
      newWholeText.push(newLine)
    }
  }
  return newWholeText
}
//

export default convertWholeText