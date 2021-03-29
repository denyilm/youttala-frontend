const getPickedWord = (pickedSpan) => {
  const regex = /[–!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
  return pickedSpan.replace(regex, '')
}

export default getPickedWord