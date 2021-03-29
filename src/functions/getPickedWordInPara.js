const getPickedWordInPara = (pickedSpan) => {
  let lineIndex = pickedSpan.split('').findIndex(char => char === '-')
  let length = Number(pickedSpan.substring(0,lineIndex))
  const regex = /[–!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
  return pickedSpan.substring(lineIndex+1 , lineIndex+length+1).replace(regex, '')
}

export default getPickedWordInPara