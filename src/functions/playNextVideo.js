const playNextVideo = (
  videoIndex,
  youTubeLinks,
  setVideoIndex,
  setCurrentVideoId,
  setYouTubeLink,
  setPlayingVideoTime,
  setShowSubtitle,
  setSynchedSubtitle
) => {
  if(videoIndex < (youTubeLinks.length-1)){
    setVideoIndex(videoIndex+1)
    let videoId = youTubeLinks[videoIndex+1].videoId
    setCurrentVideoId(videoId)

    let url = youTubeLinks[videoIndex+1].youtubeLink
    if(youTubeLinks[videoIndex].youtubeLink === url){
      setYouTubeLink(url + ' ')
    }
    setYouTubeLink(url)

    let time = youTubeLinks[videoIndex+1].time
    setPlayingVideoTime(time)


    setShowSubtitle(false)
    setSynchedSubtitle(youTubeLinks, videoIndex+1)
  }
}

export default playNextVideo