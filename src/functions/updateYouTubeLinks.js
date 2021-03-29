/* eslint-disable no-unused-vars */
/*
If the app is not ready which means the data is not fetched yet, when the user submit a query
the query is channeled to the backend, the results one get from the backend will have onlt the first ten links convertedWholeText
Because the size of convertedWholeText is too big and it causes some sort of lag when transfering the data from backend server to the browser
This function will update the youTubeLinks as soon as the appReady becomes true, and fetch all the convertedWholeText in the background
*/

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

/*
{
    'youtubeLink': uTubeLink,
    'videoId': id,
    'time': time,
    'wholeText': convertedWholeText,
    'subtitleIndex' : i
}
*/

const updateYouTubeLinks = (subtitles, youTubeLinkList, setYouTubeLinks) => {
  youTubeLinkList.map(youTubeLink => {
    youTubeLink.wholeText = convertWholeText(subtitles.find(subtitle => subtitle.videoId === youTubeLink.videoId).text)
  })
  setYouTubeLinks(youTubeLinkList)
  console.log('youTubeLinks updated')
}

export default updateYouTubeLinks