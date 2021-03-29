//S-contains
function contains(query, wholeText){
  let word = query
  let puncReg = /[.,"'?!;:]*/
  let startReg = /^/
  let endReg = /$/
  let regex = new RegExp(startReg.source +
          puncReg.source +
          word +
          puncReg.source +
          endReg.source , 'i' )


  //console.log(wholeText)
  let filteredWholeText = wholeText.filter(line => !line.includes('-->'))
  //console.log(filteredWholeText)
  let l = filteredWholeText.length

  let contains = false

  for(let i = 0 ; i < l ; i++){
    let line = filteredWholeText[i]

    let lineArr = line.split(' ')

    lineArr.forEach(function(ord){
      if(regex.test(ord)){
        //console.log('line is here!!!!', line)
        //console.log('lineArr is here!!!!', lineArr)
        //console.log( `OBS! "${word}" is found`)
        contains = true
      }
    })
    //I am not sure
    if(contains){
      break
    }
  }

  return contains
}
//E-contains

export default contains
