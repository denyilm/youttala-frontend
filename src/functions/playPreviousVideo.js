const playPreviousVideo = (
  videoIndex,
  setVideoIndex,
  youTubeLinks,
  setCurrentVideoId,
  setYouTubeLink,
  setPlayingVideoTime,
  currentVideoId,
  playingVideoTime,
  youTubeLink,
  setShowSubtitle,
  setSynchedSubtitle
) => {
  if(videoIndex >= 1){
    setVideoIndex(videoIndex-1)
    let videoId = youTubeLinks[videoIndex-1].videoId
    setCurrentVideoId(videoId)

    let url = youTubeLinks[videoIndex-1].youtubeLink
    setYouTubeLink(url)

    let time = youTubeLinks[videoIndex-1].time
    setPlayingVideoTime(time)

    if(videoId === currentVideoId && time === playingVideoTime){
      if(youTubeLink === youTubeLinks[videoIndex-1].youtubeLink + ' '){
        setYouTubeLink(youTubeLinks[videoIndex-1].youtubeLink)
      } else {
        setYouTubeLink(youTubeLinks[videoIndex-1].youtubeLink + ' ')
      }
    }
    setShowSubtitle(false)
    setSynchedSubtitle(youTubeLinks, videoIndex-1)
  }
}

export default playPreviousVideo