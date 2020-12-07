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

  let returnThis = []
  wholeText.forEach( function(line){
    let lineArr = line.split(' ')
    lineArr.forEach(function(ord){
      if(regex.test(ord)){
        //console.log( `"${word}" is found`);
        returnThis.push(line)
      }
    })
  })
  return returnThis.length !== 0
}

export default contains