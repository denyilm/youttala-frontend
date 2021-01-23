/* eslint-disable no-unused-vars */
function convertArrayTimeIntoSeconds(arr){
  return parseInt(arr[0])*3600 + parseInt(arr[1])*60 + parseInt(arr[2])
}

function findTimeInVideo(lineIndex, wholeText){
  let timeStamp
  let hour = ''
  let minutes = ''
  let seconds = ''
  let index

  for(let i = lineIndex ; i > 0 ; i--){
    if(wholeText[i].includes('-->')){
      timeStamp = wholeText[i]
      hour = wholeText[i].substring(0,2)
      //console.log(hour);
      minutes = wholeText[i].substring(3,5)
      //console.log(minutes);
      seconds = wholeText[i].substring(6,8)
      //console.log(seconds);
      index = i
      break
    }
  }

  return { 'timeStamp': timeStamp, 'time': convertArrayTimeIntoSeconds([hour, minutes, seconds]), 'firstTimeIndex': index }
}

function findNextTime(firstTimeIndex, wholeText){
  let nextTimeStamp
  let secondTimeIndex

  for(let i = firstTimeIndex + 1 ; i < wholeText.length - 1 ; i++){
    if(wholeText[i].includes('-->')){
      nextTimeStamp = wholeText[i]
      //console.log(seconds);
      secondTimeIndex = i
      //console.log('secondTimeIndex:', secondTimeIndex)
      break
    }
  }

  return { 'nextTimeStamp': nextTimeStamp, 'secondTimeIndex': secondTimeIndex }
}

//shuffle an Array
function shuffle(arr){
  let copyArr = []
  let pickedNumbers = []
  let length = arr.length
  let i = 0

  while(i<length){
    let number = Math.floor(Math.random()*length)
    if(pickedNumbers.indexOf(number)===-1){
      i++
      pickedNumbers.push(number)
      copyArr.push(arr[number])
    }
  }
  return copyArr
}

function buildLink(videoID, time){
  return `https://www.youtube.com/embed/${videoID}?start=${time}&autoplay=1&cc_load_policy=1&cc_lang_pref=sv`
}


//function buildYouTubeLinkArray(query, idArr, database){
//let word = query
//let puncReg = /[.,"'?!;:]*/
/*
  let startReg = /^/
  let endReg = /$/
  let regex = new RegExp(startReg.source +
        puncReg.source +
        word +
        puncReg.source +
        endReg.source , 'i' )

  //copy this into the global youtube link array
  let theList = []

  idArr.forEach(function(id){
    let wholeText = database.filter( subtitle => subtitle.videoId === id )[0].text
    let l = wholeText.length

    for(let i = 0; i < l - 1 ; i++){
      let time
      let timeStamp
      let firstTimeIndex
      let uTubeLink = ''
      let wordArr = wholeText[i].split(' ')
      wordArr.forEach(function(ord){
        if(regex.test(ord)){
          time = findTimeInVideo(i,wholeText).time
          timeStamp = findTimeInVideo(i, wholeText).timeStamp
          firstTimeIndex = findTimeInVideo(i, wholeText).firstTimeIndex
          uTubeLink = buildLink(id,time)
          theList.push({
            'youtubeLink': uTubeLink,
            'id': id,
            'time': time,
            'timeStamp': timeStamp,
            'firstTimeIndex': firstTimeIndex,
            'nextTimeStamp': findNextTime(firstTimeIndex, wholeText).nextTimeStamp,
            'secondTimeIndex': findNextTime(firstTimeIndex, wholeText).secondTimeIndex,
            'lineIndex': i,
            'wholeText': wholeText,
            'lineText': wholeText[i]
          })
        }
      })

    }
  })
  return shuffle(theList)
}
*/

//getSubtitleBetweenTwoStamps starts
function getSubtitleBetweenTwoStamps(wholeText, firstTimeIndex, secondTimeIndex) {
  let subtitleBetweenTwoStamps = wholeText.slice(firstTimeIndex + 1 , secondTimeIndex)
  //console.log(subtitleBetweenTwoStamps)
  let returnThis = subtitleBetweenTwoStamps.reduce(function( sub, line) {
    return sub + line + '\n'
  }, '' )
  return returnThis.split('\n').slice(0, -1).join('\n')
}
//getSubtitleBetweenTwoStamps starts

//Must return the text between two time stamps ( which includes -->) and the time difference between the two
//tillTheNextStamp starts
function tillTheNextStamp(firstTime, firstTimeIndex, wholeText) {
  var hour = ''
  var minutes = ''
  var seconds = ''
  //var nextTimeStamp
  var secondTimeIndex
  var textBetweenTwoStamps

  //console.log('firstTime', firstTime)
  //console.log('firstTimeIndex', firstTimeIndex)

  //console.log('firstTime:', firstTime)
  //console.log('firstTimeIndex:', firstTimeIndex)


  for(let i = firstTimeIndex + 1 ; i < wholeText.length - 1 ; i++){
    if(wholeText[i].includes('-->') || i === wholeText.length - 1  ){
      //nextTimeStamp = wholeText[i]
      //console.log(seconds);
      secondTimeIndex = i
      //console.log('secondTimeIndex:', secondTimeIndex)
      break
    }
  }



  //console.log(nextTimeStamp)
  //For the time difference
  let amk = wholeText[firstTimeIndex]
  let timeStamp = amk.split(' --> ')
  //console.log(timeStamp)
  let subtitleEndHour = timeStamp[1].substring(0,2)
  let subtitleEndMinutes = timeStamp[1].substring(3,5)
  let subtitleEndSeconds = timeStamp[1].substring(6,8)
  let secondTime = convertArrayTimeIntoSeconds([subtitleEndHour, subtitleEndMinutes, subtitleEndSeconds])

  let difference = secondTime - firstTime
  //console.log(difference)

  textBetweenTwoStamps = getSubtitleBetweenTwoStamps(wholeText, firstTimeIndex, secondTimeIndex)
  //console.log(textBetweenTwoStamps)
  return { 'timeDifference': difference, 'text': textBetweenTwoStamps }
  //'nextTimeStamp': nextTimeStamp }
}
//tillTheNextStamp ends



//S-buildYouTubeLinkArray
function buildYouTubeLinkArray(query, idArr, database){
  let word = query
  let puncReg = /[.,"'?!;:]*/
  let startReg = /^/
  let endReg = /$/
  let regex = new RegExp(startReg.source +
        puncReg.source +
        word +
        puncReg.source +
        endReg.source , 'i' )

  //copy this into the global youtube link array
  let theList = []
  let copyIdArr = shuffle(idArr)

  //idArr.forEach(function(id){
  for(let index = 0 ; index < idArr.length - 1 ; index++){
    let id = copyIdArr[index]
    let wholeText = database.filter( subtitle => subtitle.videoId === id )[0].text
    let l = wholeText.length

    for(let i = 0; i < l - 1 ; i++){
      let time
      let timeStamp
      let firstTimeIndex
      let uTubeLink = ''
      let wordArr = wholeText[i].split(' ')

      wordArr.forEach(function(ord){
        if(regex.test(ord)){
          time = findTimeInVideo(i,wholeText).time
          timeStamp = findTimeInVideo(i, wholeText).timeStamp
          firstTimeIndex = findTimeInVideo(i, wholeText).firstTimeIndex
          uTubeLink = buildLink(id,time)
          theList.push({
            'youtubeLink': uTubeLink,
            'videoId': id,
            'time': time,
            'timeStamp': timeStamp,
            'firstTimeIndex': firstTimeIndex,
            'nextTimeStamp': findNextTime(firstTimeIndex, wholeText).nextTimeStamp,
            'secondTimeIndex': findNextTime(firstTimeIndex, wholeText).secondTimeIndex,
            'lineIndex': i,
            //'wholeText': wholeText,
            'shownSubtitles': tillTheNextStamp(time, firstTimeIndex, wholeText).text,
            'timeDifference': tillTheNextStamp(time, firstTimeIndex, wholeText).timeDifference,
            'lineText': wholeText[i]
          })
        }
      })

    }
    if(theList.length > 1000){
      break
    }
  //})
  }


  return shuffle(theList)
}
//E-buildYouTubeLinkArray



export default buildYouTubeLinkArray
//module.exports = buildYouTubeLinkArray

