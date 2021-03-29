/* eslint-disable no-unused-vars */
function convertArrayTimeIntoSeconds(arr){
  return parseInt(arr[0])*3600 + parseInt(arr[1])*60 + parseInt(arr[2])
}

function convertArrayTimeIntoMiliSeconds(arr){
  return convertArrayTimeIntoSeconds(arr.slice(0,3))*1000 + arr[3]
}

//Must return the text between two time stamps ( which includes -->) and the time difference between the two
function tillTheNextStamp(firstTime, firstTimeIndex, wholeText) {
  var hour = ''
  var minutes = ''
  var seconds = ''
  var nextTimeStamp
  var secondTimeIndex
  var textBetweenTwoStamps

  //console.log('firstTime:', firstTime)
  //console.log('firstTimeIndex:', firstTimeIndex)

  for(let i = firstTimeIndex + 1 ; i < wholeText.length - 1 ; i++){
    if(wholeText[i].includes('-->')){
      nextTimeStamp = wholeText[i]
      //console.log(seconds);
      secondTimeIndex = i
      //console.log('secondTimeIndex:', secondTimeIndex)
      break
    }
  }

  //For the time difference
  let timeStamp = nextTimeStamp.split(' --> ')
  let subtitleEndHour = timeStamp[0].substring(0,2)
  let subtitleEndMinutes = timeStamp[0].substring(3,5)
  let subtitleEndSeconds = timeStamp[0].substring(6,8)
  let secondTime = convertArrayTimeIntoSeconds([subtitleEndHour, subtitleEndMinutes, subtitleEndSeconds])

  let difference = secondTime - firstTime

  textBetweenTwoStamps = getSubtitleBetweenTwoStamps(wholeText, firstTimeIndex, secondTimeIndex)
  return { 'timeDifference': difference, 'text': textBetweenTwoStamps, 'nextTimeStamp': nextTimeStamp }
}

function getSubtitleBetweenTwoStamps(wholeText, firstTimeIndex, secondTimeIndex) {
  let subtitleBetweenTwoStamps = wholeText.slice(firstTimeIndex + 1 , secondTimeIndex)
  //console.log(subtitleBetweenTwoStamps)
  let returnThis = subtitleBetweenTwoStamps.reduce(function( sub, line) {
    return sub + line + '\n'
  }, '' )
  return returnThis.split('\n').slice(0, -1).join('\n')
}

export default tillTheNextStamp