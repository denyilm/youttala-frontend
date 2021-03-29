const secondsForward = (ref, seconds) => {
  let time = ref.current.getInternalPlayer().getCurrentTime()
  let duration = ref.current.getInternalPlayer().getDuration()
  ref.current.getInternalPlayer().pauseVideo()
  if(duration - time > seconds){
    ref.current.getInternalPlayer().seekTo(time + seconds)
  } else {
    ref.current.getInternalPlayer().seekTo(duration-1)
  }
  ref.current.getInternalPlayer().playVideo()
}

export default secondsForward