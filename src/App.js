/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import subtitleService from './services/subtitles'
import contains from './functions/contains'
import buildYouTubeLinkArray from './functions/buildYouTubeLinkArray'
import tillTheNextStamp from './functions/tillTheNextStamp'

const App = () => {
  const [subtitles, setSubtitles] = useState([])
  const [query, setQuery] = useState('')
  const [youTubeLinks, setYouTubeLinks] = useState([])
  const [playingVideo, setPlayingVideo] = useState('https://www.youtube.com/embed/RGOj5yH7evk')
  const [videoIndex, setVideoIndex] = useState(0)
  const [currentVideoId, setCurrentVideoId] = useState('')
  const [wholeText, setWholeText] = useState([]) //the text part of the playing subtitle
  const [shownSubtitles, setShownSubtitles] = useState(null)
  const [intervalTime, setIntervalTime] = useState(0)
  const [showSubtitle ,setShowSubtitle] = useState(false)
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    subtitleService
      .getAll()
      .then(subtitles => {
        setSubtitles(subtitles)
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
      let currentWholeText = youTubeLinkList[0].wholeText
      setWholeText(currentWholeText)
      let time = youTubeLinkList[0].time
      //console.log(time)
      let firstTimeIndex = youTubeLinkList[0].firstTimeIndex
      //console.log(firstTimeIndex)
      let theTextBetweenTwoStamps = tillTheNextStamp(time, firstTimeIndex, currentWholeText)
      //console.log(theTextBetweenTwoStamps)
      /*
      setShownSubtitles(theTextBetweenTwoStamps.text)
      setShowSubtitle(true)
      let timeOut = theTextBetweenTwoStamps.timeDifference*1000 + 4000
      setTimeout(() => {
        setShowSubtitle(false)
      }, timeOut)
      */
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
      let currentWholeText = youTubeLinks[videoIndex+1].wholeText
      setWholeText(currentWholeText)
      let time = youTubeLinks[videoIndex+1].time
      //console.log(time)
      let firstTimeIndex = youTubeLinks[videoIndex+1].firstTimeIndex
      //console.log(firstTimeIndex)
      let theTextBetweenTwoStamps = tillTheNextStamp(time, firstTimeIndex, currentWholeText)
      //console.log(theTextBetweenTwoStamps)
      setShownSubtitles(theTextBetweenTwoStamps.text)
      /*
      setShowSubtitle(true)
      let timeOut = theTextBetweenTwoStamps.timeDifference*1000 + 4000
      setTimeout(() => {
        setShowSubtitle(false)
      }, timeOut)
      */
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
      let currentWholeText = youTubeLinks[videoIndex-1].wholeText
      setWholeText(currentWholeText)
      let time = youTubeLinks[videoIndex-1].time
      //console.log(time)
      let firstTimeIndex = youTubeLinks[videoIndex-1].firstTimeIndex
      //console.log(firstTimeIndex)
      let theTextBetweenTwoStamps = tillTheNextStamp(time, firstTimeIndex, currentWholeText)
      //console.log(theTextBetweenTwoStamps)
      setShownSubtitles(theTextBetweenTwoStamps.text)
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
    const link = playingVideo
    if(link.substring(0,5) === 'https'){
      const linkWithoutHttps = link.substring(5, link.length)
      const linkWithHttp = 'http' + linkWithoutHttps
      setPlayingVideo(linkWithHttp)
    } else {
      const linkWithoutHttp = link.substring(4, link.length)
      const linkWithHttps = 'https' + linkWithoutHttp
      setPlayingVideo(linkWithHttps)
    }
  }

  return (
    <div>
      <h2>youttala</h2>
      <form onSubmit={handleSubmit}>
        <input value={query} onChange={({ target }) => setQuery(target.value)} size="62" type='text'></input>
        <button type='submit'>kör</button>
      </form>
      <div id='play-bar'>
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
      <p style={showWhenVisible}>{shownSubtitles}</p>
    </div>
  )
}

export default App