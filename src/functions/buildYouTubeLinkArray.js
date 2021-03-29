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
//E-shuffle

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

//converts wholeText that is formatted as an array that consists of strings into another array where every piece of ubtitle is formatted as an object
//{
//  "timeStampAsText" : "00:00:53.580 --> 00:00:55.940",
//  "secondsArr" : [53, 55],
//  "miliSecondsArr" : [53580, 55940],
//  "subtitle": ['ananı sikerim', 'orospu bitch']
//}
function convertWholeText(wholeText){
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
//E-convertWholeText

//S-buildLink
function buildLink(videoID, time){
  return `https://www.youtube.com/embed/${videoID}?start=${time}&autoplay=1&cc_load_policy=1&cc_lang_pref=sv`
}
//E-buildLink

//S-buildYouTubeLinkArray
//idArr the video that contains the query, database = object.subtitles
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
    let convertedWholeText = convertWholeText(wholeText)
    let l = convertedWholeText.length

    for(let i = 0; i < l - 1 ; i++){
      let time
      let timeStamp
      let uTubeLink = ''
      //let wordArr = wholeText[i].split(' ')
      let wordArr = []

      convertedWholeText[i].subtitle.forEach( line => {
        line.split(' ').forEach(word => wordArr.push(word))
      })

      wordArr.forEach(function(ord){
        if(regex.test(ord)){
          time = convertedWholeText[i].secondsArr[0]
          timeStamp = convertedWholeText[i].timeStampAsText
          let secondsArr = convertedWholeText[i].secondsArr
          let miliSecondsArr = convertedWholeText[i].miliSecondsArr
          let shownSubtitles = convertedWholeText[i].subtitle.join('\n')
          //firstTimeIndex = findTimeInVideo(i, wholeText).firstTimeIndex
          uTubeLink = buildLink(id,time)
          theList.push({
            'youtubeLink': uTubeLink,
            'videoId': id,
            'time': time,
            'timeStamp': timeStamp,
            'secondsArr': secondsArr,
            'miliSecondsArr': miliSecondsArr,
            //'firstTimeIndex': firstTimeIndex,
            //'nextTimeStamp': findNextTime(firstTimeIndex, wholeText).nextTimeStamp,
            //'secondTimeIndex': findNextTime(firstTimeIndex, wholeText).secondTimeIndex,
            //'lineIndex': i,
            'wholeText': convertedWholeText,
            'shownSubtitles': shownSubtitles,
            'subtitleIndex' : i
            //'timeDifference': tillTheNextStamp(time, firstTimeIndex, wholeText).timeDifference,
          })
        }
      })

    }
    if(theList.length > 1000){
      break
    }
    //})
  }

  //console.log('results: ', theList.length)

  return shuffle(theList)
}
//E-buildYouTubeLinkArray

export default buildYouTubeLinkArray
