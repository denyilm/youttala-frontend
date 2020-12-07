function convertArrayTimeIntoSeconds(arr){
  return parseInt(arr[0])*3600 + parseInt(arr[1])*60 + parseInt(arr[2])
}

//Must return the text between two time stamps ( which includes -->) and the time difference between the two
function tillTheNextStamp(firstTime, firstTimeIndex, wholeText) {
  var hour = ''
  var minutes = ''
  var seconds = ''
  var secondTime
  var secondTimeIndex
  var textBetweenTwoStamps

  //console.log('firstTime:', firstTime)
  //console.log('firstTimeIndex:', firstTimeIndex)

  for(let i = firstTimeIndex + 1 ; i < wholeText.length - 1 ; i++){
    if(wholeText[i].includes('-->')){
      hour = wholeText[i].substring(0,2)
      //console.log(hour);
      minutes = wholeText[i].substring(3,5)
      //console.log(minutes);
      seconds = wholeText[i].substring(6,8)
      //console.log(seconds);
      secondTimeIndex = i
      //console.log('secondTimeIndex:', secondTimeIndex)
      break
    }
  }

  secondTime = convertArrayTimeIntoSeconds([hour, minutes, seconds])
  let difference = secondTime - firstTime
  textBetweenTwoStamps = getSubtitleBetweenTwoStamps(wholeText, firstTimeIndex, secondTimeIndex)
  return { 'timeDifference': difference, 'text': textBetweenTwoStamps }
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