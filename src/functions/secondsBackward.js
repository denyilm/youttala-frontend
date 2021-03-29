const secondsBackward = (ref, seconds) => {
  let time = ref.current.getInternalPlayer().getCurrentTime()
  ref.current.getInternalPlayer().pauseVideo()
  ref.current.getInternalPlayer().seekTo(time - seconds)
  ref.current.getInternalPlayer().playVideo()
}

export default secondsBackward