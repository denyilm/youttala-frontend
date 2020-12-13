/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import subtitleService from './services/subtitles'
import contains from './functions/contains'
import buildYouTubeLinkArray from './functions/buildYouTubeLinkArray'
import tillTheNextStamp from './functions/tillTheNextStamp'
import YouTube from 'react-youtube'

const App = () => {
  const [subtitles, setSubtitles] = useState([])
  const [query, setQuery] = useState('')
  const [youTubeLinks, setYouTubeLinks] = useState([])
  const [playingVideo, setPlayingVideo] = useState('https://www.youtube.com/embed/RGOj5yH7evk')
  const [videoIndex, setVideoIndex] = useState(0)
  const [currentVideoId, setCurrentVideoId] = useState('5bfx6BNufdE')
  const [wholeText, setWholeText] = useState([]) //the text part of the playing subtitle
  const [shownSubtitles, setShownSubtitles] = useState(null)
  const [intervalTime, setIntervalTime] = useState(0)
  const [showSubtitle ,setShowSubtitle] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [playingVideoTime, setPlayingVideoTime] = useState(0)
  const [width, setWidth] = useState('640')
  const [timeFromYouTube, setTimeFromYouTube] = useState(null)
  const [firstTimeIndex, setFirstTimeIndex] = useState(0)

  useEffect(() => {
    axios
      .get('http://localhost:3001/subtitles')
      .then(response => {
        setSubtitles(response.data)
      })
  }, [])

  const showWhenVisible = { display: showSubtitle ? '' : 'none' }
  const showWhenVisible1 = { display: showStats ? '' : 'none' }
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      setShownSubtitles(subtitles => subtitles + 1 )
    }, 5000)
    return () => clearInterval(interval)
  }, [shownSubtitles])
  */

  //console.log(subtitles)

  //
  const handleSubmit = async(event) => {
    event.preventDefault()
    let youTubeLinkList = []
    let videoIDsThatContain = []
    try {
      subtitles.forEach(subtitle => {
        if(contains(query, subtitle.text)){
          videoIDsThatContain.push(subtitle.videoId)
        }
      })
      youTubeLinkList = buildYouTubeLinkArray(query, videoIDsThatContain, subtitles)
      setYouTubeLinks(youTubeLinkList)
      setPlayingVideo(youTubeLinkList[0].youtubeLink)
      setVideoIndex(0)
      let videoId = youTubeLinkList[0].youtubeLink.substring(30,41)
      setCurrentVideoId(videoId)
      setPlayingVideoTime(youTubeLinkList[0].time)
      let currentWholeText = youTubeLinkList[0].wholeText
      setWholeText(currentWholeText)
      let time = youTubeLinkList[0].time
      //console.log(time)
      let firstTimeIndex = youTubeLinkList[0].firstTimeIndex
      setFirstTimeIndex(firstTimeIndex)
      //console.log(firstTimeIndex)
      setShowSubtitle(false)
      setShowStats(true)
    } catch (error) {
      if(videoIDsThatContain.length === 0) {
        setShowStats(false)
        setPlayingVideo('https://www.youtube.com/embed/RGOj5yH7evk')
        setYouTubeLinks([])
        setShownSubtitles(`nothing found for ${query}`)
        setShowSubtitle(true)
        setTimeout(() => {
          setShownSubtitles(null)
          setShowSubtitle(false)
        }, 3000)
      }
    }
  }
  //

  //
  const handleNext = async(event) => {
    event.preventDefault()
    if(videoIndex < (youTubeLinks.length-1)){
      setVideoIndex(videoIndex+1)
      setPlayingVideo(youTubeLinks[videoIndex+1].youtubeLink)
      let videoId = youTubeLinks[videoIndex+1].youtubeLink.substring(30,41)
      setCurrentVideoId(videoId)
      setPlayingVideoTime(youTubeLinks[videoIndex+1].time)
      let currentWholeText = youTubeLinks[videoIndex+1].wholeText
      setWholeText(currentWholeText)
      let time = youTubeLinks[videoIndex+1].time
      //console.log(time)
      let firstTimeIndex = youTubeLinks[videoIndex+1].firstTimeIndex
      //console.log(firstTimeIndex)
      setFirstTimeIndex(firstTimeIndex)
      setShowSubtitle(false)
    }
  }
  //
  const handleBack = async(event) => {
    event.preventDefault()
    if(videoIndex >= 1){
      setVideoIndex(videoIndex-1)
      setPlayingVideo(youTubeLinks[videoIndex-1].youtubeLink)
      let videoId = youTubeLinks[videoIndex-1].youtubeLink.substring(30,41)
      setCurrentVideoId(videoId)
      setPlayingVideoTime(youTubeLinks[videoIndex-1].time)
      let currentWholeText = youTubeLinks[videoIndex-1].wholeText
      setWholeText(currentWholeText)
      let time = youTubeLinks[videoIndex-1].time
      //console.log(time)
      let firstTimeIndex = youTubeLinks[videoIndex-1].firstTimeIndex
      setFirstTimeIndex(firstTimeIndex)
      setShowSubtitle(false)
      /*
      setShowSubtitle(true)
      let timeOut = theTextBetweenTwoStamps.timeDifference*1000 + 4000
      setTimeout(() => {
        setShowSubtitle(false)
      }, timeOut)
      */
    }
  }

  const handleKörOm = async(event) => {
    event.preventDefault()
    setShowSubtitle(false)
    const link = playingVideo
    setPlayingVideo(`${link} `)
    if(width === '640'){
      setWidth('641')
    } else {
      setWidth('640')
    }
  }

  const opts = {
    height: '390',
    width: width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      cc_lang_pref: 'sv',
      autoplay: 1,
      start: playingVideoTime,
      cc_load_policy: 1,
      enablejsapi: 1,
    },
  }

  const onPlay = (event) => {
    //console.log(firstTimeIndex)
    let theTextBetweenTwoStamps = tillTheNextStamp(playingVideoTime, firstTimeIndex, wholeText)
    //console.log(theTextBetweenTwoStamps)
    setShownSubtitles(theTextBetweenTwoStamps.text)
    setShowSubtitle(true)
    let timeOut = theTextBetweenTwoStamps.timeDifference*1000
    setTimeout(() => {
      setShowSubtitle(false)
    }, timeOut)
  }

  const onPause = (event) => {
    setShowSubtitle(true)
  }

  return (
    <div class="container">
      <form onSubmit={handleSubmit}>
        <input value={query} onChange={({ target }) => setQuery(target.value)} size="62" type='text'></input>
        <button type='submit'>kör</button>
      </form>
      <div class="play-bar"id='play-bar'>
        <button onClick={handleBack}>back</button>
        <button onClick={handleKörOm}>kör om</button>
        <button onClick={handleNext}>next</button>
      </div>
      <p style={showWhenVisible1}>{videoIndex+1} av {youTubeLinks.length} </p>
      <br></br>
      <iframe id="ytplayer" type="text/html" width="640" height="360"
        src={playingVideo}
        frameBorder="0"
        allow='autoplay' >
      </iframe>
      <YouTube videoId={currentVideoId} opts={opts} onPlay={onPlay} onPause={onPause}> </YouTube>
      <p style={showWhenVisible}>{shownSubtitles}</p>
    </div>
  )
}

export default App