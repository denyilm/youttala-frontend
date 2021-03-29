const replayCurrentVideo = (
  youTubeLinks,
  setSubmitted,
  setShowSubtitle,
  youTubeLink,
  videoIndex,
  setYouTubeLink,
  setSynchedSubtitle
) => {
  if(youTubeLinks.length > 0){
    setSubmitted(false)
    setShowSubtitle(true)
    //updateWidth()
    if(youTubeLink === youTubeLinks[videoIndex].youtubeLink + ' '){
      setYouTubeLink(youTubeLinks[videoIndex].youtubeLink)
    } else {
      setYouTubeLink(youTubeLinks[videoIndex].youtubeLink + ' ')
    }
    setSynchedSubtitle(youTubeLinks, videoIndex)
  }
}

export default replayCurrentVideo