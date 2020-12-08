/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import subtitleService from './services/subtitles'
import contains from './functions/contains'
import buildYouTubeLinkArray from './functions/buildYouTubeLinkArray'
import tillTheNextStamp from './functions/tillTheNextStamp'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Player from './components/Player'
import Subtitle from './components/Subtitle'
import Footer from './components/Footer'

const AppCopy = () => {
  const [subtitles, setSubtitles] = useState([])
  const [query, setQuery] = useState('')
  const [youTubeLinks, setYouTubeLinks] = useState([])
  const [videoIndex, setVideoIndex] = useState(0)
  const [currentVideoId, setCurrentVideoId] = useState('5bfx6BNufdE')
  const [wholeText, setWholeText] = useState([]) //the text part of the playing subtitle
  const [shownSubtitles, setShownSubtitles] = useState(null)
  const [shownSubtitlesArr, setShownSubtitlesArr] = useState([])
  const [showSubtitle ,setShowSubtitle] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [playingVideoTime, setPlayingVideoTime] = useState(0)
  const [width, setWidth] = useState('640')
  const [autoplay, setAutoplay] = useState(0)
  const [firstTimeIndex, setFirstTimeIndex] = useState(0)

  useEffect(() => {
    subtitleService
      .getAll()
      .then(subtitles => {
        setSubtitles(subtitles)
      })
  },[])

  //hide/show starts

  const showWhenVisible = { display: showSubtitle ? '' : 'none' }
  const showStatsWhenVisible = { display: showStats ? '' : 'none' }

  //hide/shoe ends

  //handleQueryChange starts
  const handleQueryChange = (event) => setQuery(event.target.value)

  //handleSubmit starts
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
      setVideoIndex(0)
      let videoId = youTubeLinkList[0].id
      setCurrentVideoId(videoId)
      let time = youTubeLinkList[0].time
      setPlayingVideoTime(time)
      let currentWholeText = youTubeLinkList[0].wholeText
      setWholeText(currentWholeText)
      let firstTimeIndex = youTubeLinkList[0].firstTimeIndex
      setFirstTimeIndex(firstTimeIndex)
      setAutoplay(1)
      setShowSubtitle(false)
      setShowStats(true)
    } catch (error) {
      if(videoIDsThatContain.length === 0) {
        setShowStats(false)
        setYouTubeLinks([])
        setShownSubtitles(`nothing found for ${query}`)
        setShowSubtitle(true)
        setTimeout(() => {
          setShownSubtitles(null)
          setShowSubtitle(false)
        }, 5000)
      }
    }
  }
  ////handleSubmit ends

  //opts starts
  const opts = {
    height: '390',
    width: width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      cc_lang_pref: 'sv',
      autoplay: autoplay,
      start: playingVideoTime,
      cc_load_policy: 1,
      enablejsapi: 1,
    },
  }
  //opts ends

  //onPlay starts
  const onPlay = (event) => {
    let theTextBetweenTwoStamps = tillTheNextStamp(playingVideoTime, firstTimeIndex, wholeText)
    setShownSubtitles(theTextBetweenTwoStamps.text)
    let shownSubtitlesArr = theTextBetweenTwoStamps.text.split(/[\s\n]+/)
    setShownSubtitlesArr(shownSubtitlesArr)
    setShowSubtitle(true)
    let timeOut = theTextBetweenTwoStamps.timeDifference*1000
    setTimeout(() => {
      setShowSubtitle(false)
    }, timeOut)
  }
  //onPlay ends

  //handleBack starts
  const handleBack = async(event) => {
    event.preventDefault()
    if(videoIndex >= 1){
      setVideoIndex(videoIndex-1)
      let videoId = youTubeLinks[videoIndex-1].id
      setCurrentVideoId(videoId)
      let time = youTubeLinks[videoIndex-1].time
      setPlayingVideoTime(time)
      let currentWholeText = youTubeLinks[videoIndex-1].wholeText
      setWholeText(currentWholeText)
      let firstTimeIndex = youTubeLinks[videoIndex-1].firstTimeIndex
      setFirstTimeIndex(firstTimeIndex)
      setShowSubtitle(false)
    }
  }
  //handleBack ends

  //handleKörOm starts
  const handleKörOm = async(event) => {
    event.preventDefault()
    setShowSubtitle(true)
    if(width === '640'){
      setWidth('640.1')
    } else {
      setWidth('640')
    }
  }
  //handleKörOm ends

  //handleBack starts
  const handleNext = async(event) => {
    event.preventDefault()
    if(videoIndex < (youTubeLinks.length-1)){
      setVideoIndex(videoIndex+1)
      let videoId = youTubeLinks[videoIndex+1].id
      setCurrentVideoId(videoId)
      let time = youTubeLinks[videoIndex+1].time
      setPlayingVideoTime(time)
      let currentWholeText = youTubeLinks[videoIndex+1].wholeText
      setWholeText(currentWholeText)
      let firstTimeIndex = youTubeLinks[videoIndex+1].firstTimeIndex
      setFirstTimeIndex(firstTimeIndex)
      setShowSubtitle(false)
    }
  }
  //handleBack ends

  const handleShow = () => setShowSubtitle(true)
  const handleHide = () => setShowSubtitle(false)

  return (
    <div>
      <Header/>
      <SearchBar
        query={query}
        handleQueryChange={handleQueryChange}
        handleSubmit={handleSubmit}/>
      <Player
        videoId={currentVideoId}
        opts={opts}
        handleBack={handleBack}
        handleKörOm={handleKörOm}
        handleNext={handleNext}
        onPlay={onPlay}
        showStats={showStats}
        videoIndex={videoIndex+1}
        length={youTubeLinks.length}
      />
      <Subtitle
        showSubtitle={showSubtitle}
        shownSubtitles={shownSubtitles}
        shownSubtitlesArr={shownSubtitlesArr}
        handleShow={handleShow}
        handleHide={handleHide}
        query={query}
      />
      <Footer/>
    </div>
  )
}

export default AppCopy
