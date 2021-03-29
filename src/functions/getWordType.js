/* eslint-disable no-unused-vars */
const getWordType = (pickedWordType) => {
  if(pickedWordType === ''){
    //setWordType('empty')
    return 'empty'
  } else {
    //setWordType(picked_wordType)
    return pickedWordType
  }
}

export default getWordType