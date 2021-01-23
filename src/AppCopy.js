/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import subtitleService from './services/subtitles'
import contains from './functions/contains'
import buildYouTubeLinkArray from './functions/buildYouTubeLinkArray'
import tillTheNextStamp from './functions/tillTheNextStamp'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Player from './components/Player'
import Subtitle from './components/Subtitle'
import Footer from './components/Footer'
import AdminBar from './components/AdminBar'
import axios from 'axios'

const AppCopy = () => {
  const [subtitles, setSubtitles] = useState([])
  const [query, setQuery] = useState('')
  const [youTubeLinks, setYouTubeLinks] = useState([])
  const [videoIndex, setVideoIndex] = useState(0)
  const [currentVideoId, setCurrentVideoId] = useState('vfQU6pI51ww')
  const [wholeText, setWholeText] = useState([]) //the text part of the playing subtitle
  const [shownSubtitles, setShownSubtitles] = useState(null)
  const [shownSubtitlesArr, setShownSubtitlesArr] = useState([])
  const [showSubtitle ,setShowSubtitle] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [playingVideoTime, setPlayingVideoTime] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [youTubeContainerClassName, setYouTubeContainerClassName] = useState('iFrame')
  const [autoplay, setAutoplay] = useState(0)
  const [firstTimeIndex, setFirstTimeIndex] = useState(0)
  //for admin to manage removing buggy lines
  const [queryVideoId, setQueryVideoId] = useState('')
  const [bugId, setBugId] = useState('')
  const [adminMesssage1, setAdminMessage1] = useState('')
  const [currentSubtitle, setCurrentSubtitle] = useState(null)
  const [adminMessage2, setAdminMessage2] = useState('')
  const [adminMessage3, setAdminMessage3] = useState('')

  const randomWords = ['skillnad', 'stark', 'tyckte', 'ärtsoppa',
    'sovit', 'behagligt', 'kör', 'sig', 'riktig',
    'möjligtvis', 'bollhjul', 'byggt', 'dagar',
    'stenhårda', 'fyra', 'tittarna', 'skrynkliga',
    'noggrann', 'badkar', 'jättekul', 'läskigt',
    'börjar', 'själv', 'självklart', 'försiktig']

  /*
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
  })
  */

  //iPhone 5/SE 320x568
  //iPhone 6/7/8 375x667
  //iPhone 6/7/8 Plus 414x736
  //iPhone X 375x812
  //iPad 768x1024
  //iPad Pro 1024x1366



  useEffect(() => {
    subtitleService
      .getAll()
      .then(subtitles => {
        setSubtitles(subtitles)
      })
  },[])


  useEffect(() => {
    if(window.innerWidth < 415){
      //iPhone 5/SE/6/7/8
      setWidth('320')
      setHeight('200')
    }else if(window.innerWidth < 668){
      //iPhone 6/7/8 Plus
      setWidth('400')
      setHeight('300')
    }else if(window.innerWidth > 668){
      //iPad and PC
      setWidth('640')
      setHeight('360')
    }
  },[])

  window.addEventListener('resize', (event) => {
    event.preventDefault()
    if(window.innerWidth < 415){
      setWidth('310')
      setHeight('200')
    }else if(window.innerWidth < 668){
      setWidth('400')
      setHeight('300')
    }else if(window.innerWidth > 668){
      setWidth('640')
      setHeight('360')
    }
  })


  /*
  useEffect(() => {
    axios
      .get('http://localhost:3001/subtitles')
      .then(response => {
        setSubtitles(response.data)
      })
  }, [])
  */

  //hide/show starts

  const showWhenVisible = { display: showSubtitle ? '' : 'none' }
  const showStatsWhenVisible = { display: showStats ? '' : 'none' }

  //hide/shoe ends

  //handleQueryChange starts
  const handleQueryChange = (event) => setQuery(event.target.value)

  //handleSubmit starts
  const handleSubmit = async(event) => {
    event.preventDefault()
    console.log(query)
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

      if(videoId === currentVideoId && time === playingVideoTime){
        if(width === '640'){
          setWidth('640.1')
        } else {
          setWidth('640')
        }
      }

      let currentWholeText = youTubeLinkList[0].wholeText
      setWholeText(currentWholeText)
      let firstTimeIndex = youTubeLinkList[0].firstTimeIndex
      setFirstTimeIndex(firstTimeIndex)
      setAutoplay(1)
      setShowSubtitle(false)
      setShowStats(true)
    } catch (error) {
      if(videoIDsThatContain.length === 0) {
        setCurrentVideoId('5bfx6BNufdE')
        setWholeText([])
        setFirstTimeIndex(0)
        setPlayingVideoTime(0)
        setAutoplay(0)
        setShowStats(false)
        setYouTubeLinks([])
        let length = randomWords.length - 1
        let word = randomWords[[Math.floor(Math.random()*length)]]
        let text = `nothing found for ${query}, try "${word}"`
        setShownSubtitles(text)
        let shownSubtitlesArr = text.split(/[\s\n]+/)
        setShownSubtitlesArr(shownSubtitlesArr)
        setShowSubtitle(true)
        /*
        setTimeout(() => {
          setShownSubtitles(null)
          setShowSubtitle(false)
        }, 5000)
        */
      }
    }
  }
  ////handleSubmit ends

  //opts starts
  const opts = {
    height: height,
    width: width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      cc_lang_pref: 'sv',
      autoplay: autoplay,
      start: playingVideoTime,
      cc_load_policy: autoplay,
      enablejsapi: 1,
    },
  }
  //opts ends

  //onPlay starts
  const onPlay = (event) => {
    if(wholeText.length>0){
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

      if(videoId === currentVideoId && time === playingVideoTime){
        /*
        if(width === '640'){
          setWidth('640.1')
        } else if (width === '640.1') {
          setWidth('640')
        }
        */

        switch (width) {
        case '640':
          setWidth('640.1')
          break
        case '640.1':
          setWidth('640')
          break
        case '400':
          setWidth('400.1')
          break
        case '400.1':
          setWidth('400')
          break
        case '310':
          setWidth('310.1')
          break
        case '310.1':
          setWidth('310')
          break
        }
      }

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
    switch (width) {
    case '640':
      setWidth('640.1')
      break
    case '640.1':
      setWidth('640')
      break
    case '400':
      setWidth('400.1')
      break
    case '400.1':
      setWidth('400')
      break
    case '310':
      setWidth('310.1')
      break
    case '310.1':
      setWidth('310')
      break
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

      switch (width) {
      case '640':
        setWidth('640.1')
        break
      case '640.1':
        setWidth('640')
        break
      case '400':
        setWidth('400.1')
        break
      case '400.1':
        setWidth('400')
        break
      case '310':
        setWidth('310.1')
        break
      case '310.1':
        setWidth('310')
        break
      }

      let currentWholeText = youTubeLinks[videoIndex+1].wholeText
      setWholeText(currentWholeText)
      let firstTimeIndex = youTubeLinks[videoIndex+1].firstTimeIndex
      setFirstTimeIndex(firstTimeIndex)
      setShowSubtitle(false)
    }
  }
  //handleBack ends

  //handleBug starts
  const handleBug = async(subtitleObject) => {
    console.log(subtitleObject.videoId)
    try {
      let buggyLines = subtitleObject.buggyLines
      const youTubeLink = youTubeLinks[videoIndex]
      const timeStamp = youTubeLink.timeStamp
      const hour = timeStamp.substring(0,2)
      const minutes = timeStamp.substring(3,5)
      const seconds = timeStamp.substring(6,8)
      const mseconds = timeStamp.substring(9,12)
      const bugId = `${youTubeLink.id}_${hour}${minutes}${seconds}${mseconds}`

      //buggyLines = []

      if(!buggyLines.find(bug => bug.bugId === bugId)){
        //to clean the buggyLines of the subtitleObject disable from here to
        buggyLines.push(
          {
            bugId: bugId,
            buggyText: youTubeLink.lineText,
            lineIndex: youTubeLink.lineIndex,
            time: youTubeLink.time,
            timeStamp: youTubeLink.timeStamp,
            firstTimeIndex: youTubeLink.firstTimeIndex,
            nextTimeStamp: youTubeLink.nextTimeStamp,
            secondTimeIndex: youTubeLink.secondTimeIndex,
            link: youTubeLink.youtubeLink })
        //... to here
        const newSubtitle = await subtitleService.reportBug({
          //channelTitle: subtitleObject.channelTitle,
          //videoId: subtitleObject.videoId,
          videoId: subtitleObject.videoId,
          buggyLines: buggyLines,
          //text: subtitleObject.text
        })
      }else{
        console.log('already reported')
      }
      console.log('handleBug worked')
    } catch (e) {
      console.log(e)
      console.log('handleBug failed')
    }
  }
  //handleBug ends

  const handleShow = () => setShowSubtitle(true)
  const handleHide = () => setShowSubtitle(false)

  //Admin
  //

  const handleQueryVideoIdChange = (event) => setQueryVideoId(event.target.value)
  const handleQueryBugIdChange = (event) => setBugId(event.target.value)

  //find video by its id
  const searchVideoById = async(event) => {
    event.preventDefault()
    try {
      setWholeText([])
      setFirstTimeIndex(0)
      setPlayingVideoTime(0)
      setAutoplay(0)
      setShowStats(false)
      setYouTubeLinks([])

      if(subtitles.find( subtitle => subtitle.videoId === queryVideoId)){
        setCurrentVideoId(queryVideoId)
        setAdminMessage1(`${queryVideoId} found`)
        setCurrentSubtitle(subtitles.find( subtitle => subtitle.videoId === queryVideoId))
      }else {
        setCurrentVideoId('5bfx6BNufdE')
        setAdminMessage1('This subtitle is not in the db')
        setBugId('')
        setAdminMessage2('')
      }

    } catch (error) {
      console.log(error)
      setAdminMessage1('There was an error, check the console')
      setWholeText([])
      setFirstTimeIndex(0)
      setPlayingVideoTime(0)
      setAutoplay(0)
      setShowStats(false)
      setYouTubeLinks([])
      setCurrentVideoId('5bfx6BNufdE')
    }
  }

  const searchBugById = async(event) => {
    event.preventDefault()

    try {
      if(currentSubtitle.buggyLines.find(bug => bug.bugId === bugId)){
        setAdminMessage2(`${bugId} found`)
        setBugId(bugId)
        let buggyLine = currentSubtitle.buggyLines.find(bug => bug.bugId === bugId)
        setPlayingVideoTime(buggyLine.time)
        setAutoplay(1)
        setShownSubtitles(false)
      } else {
        setAdminMessage2(`${bugId} not found`)
      }
    } catch (error) {
      console.log(error)
      setAdminMessage2(`There was an error, see the console, ${bugId} not found`)
    }

  }

  //handleCorrect starts
  const handleCorrect = async( subtitleObject, bugId ) => {
    const buggyLine = subtitleObject.buggyLines.find(buggyLine => buggyLine.bugId === bugId)
    console.log(buggyLine)
    const confirmation = window.confirm(`Do you really want to remove the part from ${buggyLine.timeStamp} to ${buggyLine.nextTimeStamp}?`)
    //const buggyLine = subtitleObject.buggyLines.find(buggyLine => buggyLine.bugId === bugId)

    if(confirmation){
      try {
        const deleteFrom = buggyLine.firstTimeIndex
        const deleteUpTo = buggyLine.secondTimeIndex
        const deleteCount = deleteUpTo - deleteFrom
        const buggyLines = subtitleObject.buggyLines.slice()
        console.log(buggyLines)
        const correctedBuggyLines = buggyLines.filter(buggyLine => buggyLine.bugId !== bugId)
        console.log(correctedBuggyLines)
        const correctedText = subtitleObject.text
        correctedText.splice(deleteFrom, deleteCount)
        const newSubtitle = await subtitleService.deleteBuggyLines({
          //channelTitle: subtitleObject.channelTitle,
          //videoId: subtitleObject.videoId,
          id: subtitleObject.id,
          buggyLines: correctedBuggyLines,
          text: correctedText
        })
        setAdminMessage3(`${bugId} corrected`)
      } catch (error) {
        console.log(error)
        setAdminMessage3('Correction failed, see the conssole')
        //setAdminMessage('subtitle could not be corrected')
      }
    }else {
      setAdminMessage3('Correction cancelled')
    }

  }
  //handleCorrect ends



  return (
    <div>
      <Header/>
      <AdminBar
        queryVideoId = {queryVideoId}
        handleQueryVideoIdChange = {handleQueryVideoIdChange}
        searchVideoById = {searchVideoById}
        adminMessage1={adminMesssage1}
        queryBugId={bugId}
        handleQueryBugIdChange={handleQueryBugIdChange}
        searchBugById={searchBugById}
        adminMessage2={adminMessage2}
        handleCorrect={() => handleCorrect(currentSubtitle, bugId)}
        adminMessage3={adminMessage3}
      />
      <div className='container'>
        <SearchBar
          query={query}
          handleQueryChange={handleQueryChange}
          handleSubmit={handleSubmit}/>
        <div className='player-all'>
          <Player
            videoId={currentVideoId}
            opts={opts}
            containerClassName={youTubeContainerClassName}
            handleBack={handleBack}
            handleKörOm={handleKörOm}
            handleNext={handleNext}
            onPlay={onPlay}
            showStats={showStats}
            videoIndex={videoIndex+1}
            length={youTubeLinks.length}
            handleBug={() => handleBug(subtitles.find(subtitle => subtitle.videoId === currentVideoId))}
          />
        </div>
        <Subtitle
          showSubtitle={showSubtitle}
          shownSubtitles={shownSubtitles}
          shownSubtitlesArr={shownSubtitlesArr}
          handleShow={handleShow}
          handleHide={handleHide}
          query={query}
        />
      </div>
      <Footer/>
    </div>
  )
}

export default AppCopy
