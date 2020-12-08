function convertArrayTimeIntoSeconds(arr){
  return parseInt(arr[0])*3600 + parseInt(arr[1])*60 + parseInt(arr[2])
}

function findTimeInVideo(lineIndex, wholeText){
  let hour = ''
  let minutes = ''
  let seconds = ''
  let index

  for(let i = lineIndex ; i > 0 ; i--){
    if(wholeText[i].includes('-->')){
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

  return { 'time': convertArrayTimeIntoSeconds([hour, minutes, seconds]), 'firstTimeIndex': index }
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

  idArr.forEach(function(id){
    let wholeText = database.filter( subtitle => subtitle.videoId === id )[0].text
    let l = wholeText.length

    for(let i = 0; i < l - 1 ; i++){
      let time
      let firstTimeIndex
      let uTubeLink = ''
      let wordArr = wholeText[i].split(' ')
      wordArr.forEach(function(ord){
        if(regex.test(ord)){
          time = findTimeInVideo(i,wholeText).time
          firstTimeIndex = findTimeInVideo(i, wholeText).firstTimeIndex
          uTubeLink = buildLink(id,time)
          theList.push({
            'youtubeLink': uTubeLink,
            'id': id,
            'time': time,
            'firstTimeIndex': firstTimeIndex,
            'lineIndex': i,
            'wholeText': wholeText })
        }
      })

    }
  })
  return shuffle(theList)
}


export default buildYouTubeLinkArray

