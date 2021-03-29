const checkMiniLex = (player, pickedSpan, miniPickedWord) => {
  if(miniPickedWord.toLowerCase() !== pickedSpan.toLowerCase()){
    //setMiniPickedWord(pickedSpan)
    player.pauseVideo()
    return pickedSpan
  } else {
    //setMiniPickedWord('')
    player.playVideo()
    return ''
  }
}

export default checkMiniLex