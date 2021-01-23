/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
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
import About from './components/About'

const AppCopy2 = () => {
  const [subtitles, setSubtitles] = useState([])
  const [query, setQuery] = useState('')
  const [youTubeLinks, setYouTubeLinks] = useState([])
  const [videoIndex, setVideoIndex] = useState(0)
  const [currentVideoId, setCurrentVideoId] = useState('G_O0N3R-Lv8')
  //const [wholeText, setWholeText] = useState([]) //the text part of the playing subtitle
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
  const [about, setAbout] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [appReady, setAppReady] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)
  //for admin to manage removing buggy lines
  const [queryVideoId, setQueryVideoId] = useState('')
  const [bugId, setBugId] = useState('')
  const [adminMesssage1, setAdminMessage1] = useState('')
  const [currentSubtitle, setCurrentSubtitle] = useState(null)
  const [adminMessage2, setAdminMessage2] = useState('')
  const [adminMessage3, setAdminMessage3] = useState('')
  const history = useHistory()

  const randomWords = [
    'skillnad', 'stark', 'tycker',
    'också', 'någon', 'någonsin',
    'älskar' , 'skämtar', 'kör',
    'gör', 'gjorde', 'gjort',
    'sig', 'dig', 'mig',
    'skönt', 'bygger', 'dagen',
    'roligt', 'kul', 'jättekul',
    'härifrån', 'åtminstone', 'därifrån',
    'läskigt', 'försvinner', 'väldigt',
    'längesen', 'själv', 'självklart',
    'försiktig', 'allvarligt', 'läget'
  ]

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
        setAppReady(true)
        history.push('/')
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

  let updateWidth = () => {
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

  //hide/show starts
  const showWhenVisible = { display: showSubtitle ? '' : 'none' }
  const showStatsWhenVisible = { display: showStats ? '' : 'none' }
  //hide/shoe ends

  //handleQueryChange starts
  const handleQueryChange = (event) => setQuery(event.target.value)
  //handleQueryChange starts

  //S-setAfterSearch
  const setAfterSearch = (youTubeLinkList) => {
    setYouTubeLinks(youTubeLinkList)
    setVideoIndex(0)
    let videoId = youTubeLinkList[0].videoId
    setCurrentVideoId(videoId)
    let time = youTubeLinkList[0].time
    setPlayingVideoTime(time)

    if(videoId === currentVideoId && time === playingVideoTime){
      updateWidth()
    }

    let firstTimeIndex = youTubeLinkList[0].firstTimeIndex
    setFirstTimeIndex(firstTimeIndex)
    setAutoplay(1)
    setShowSubtitle(false)
    setShowStats(true)
  }
  //E-setAfterSearch

  //s-resetApp
  const resetQuery = ( query, text ) => {
    setCurrentVideoId('G_O0N3R-Lv8')
    //setWholeText([])
    setFirstTimeIndex(0)
    setPlayingVideoTime(0)
    setAutoplay(0)
    setShowStats(false)
    setYouTubeLinks([])
    let length = randomWords.length - 1
    let word = randomWords[[Math.floor(Math.random()*length)]]
    let shownText = `${text}${query}, try '${word}'`
    setShownSubtitles(shownText)
    let shownSubtitlesArr = shownText.split(/[\s\n]+/)
    setShownSubtitlesArr(shownSubtitlesArr)
    setShowSubtitle(true)
    window.clearTimeout(timeoutId)
  }
  //e-resetApp

  //handleSubmit starts
  const handleSubmit = async(event) => {
    event.preventDefault()
    //console.log(query)
    let youTubeLinkList = []
    let videoIDsThatContain = []
    if(query !== ''){
      try {
        if(appReady){
          subtitles.forEach(subtitle => {
            if(contains(query, subtitle.text)){
              videoIDsThatContain.push(subtitle.videoId)
            }
          })
          youTubeLinkList = buildYouTubeLinkArray(query, videoIDsThatContain, subtitles)
          setAfterSearch(youTubeLinkList)
          //console.log('done from frontend')
        } else {
          subtitleService.getResults(query)
            .then(response => {
              youTubeLinkList = response.youTubeLinkList
              //console.log(youTubeLinkList.length)
              videoIDsThatContain = response.videoIDsThatContain
              if(videoIDsThatContain.length === 0){
                resetQuery( query, 'nothing found for ' )
              } else {
                setAfterSearch(youTubeLinkList)
              }
              //console.log('done from backend')
            })
        }
      } catch (error) {
        if(videoIDsThatContain.length === 0) {
          resetQuery( query, 'nothing found for ' )
        }
      }
    } else {
      resetQuery( query, 'please type something' )
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
    if(youTubeLinks.length > 0) {
      window.clearTimeout(timeoutId)
      let youTubeLink = youTubeLinks[videoIndex]
      //console.log(youTubeLink)
      let theTextBetweenTwoStamps = youTubeLink.shownSubtitles
      //console.log(theTextBetweenTwoStamps)
      setShownSubtitles(theTextBetweenTwoStamps)
      let shownSubtitlesArr = theTextBetweenTwoStamps.split(/[\s\n]+/)
      setShownSubtitlesArr(shownSubtitlesArr)
      setShowSubtitle(true)
      let timeOut = youTubeLink.timeDifference*1000 + 300
      let NewTimeoutId = window.setTimeout(() => {
        setShowSubtitle(false)
      }, timeOut)
      setTimeoutId(NewTimeoutId)
    }
  }
  //onPlay ends

  //handleBack starts
  const handleBack = async(event) => {
    event.preventDefault()
    if(videoIndex >= 1){
      setVideoIndex(videoIndex-1)
      let videoId = youTubeLinks[videoIndex-1].videoId
      setCurrentVideoId(videoId)
      let time = youTubeLinks[videoIndex-1].time
      setPlayingVideoTime(time)

      if(videoId === currentVideoId && time === playingVideoTime){
        updateWidth()
      }
      //let currentWholeText = youTubeLinks[videoIndex-1].wholeText
      //setWholeText(currentWholeText)
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
    updateWidth()
  }
  //handleKörOm ends

  //handleBack starts
  const handleNext = async(event) => {
    event.preventDefault()
    if(videoIndex < (youTubeLinks.length-1)){
      setVideoIndex(videoIndex+1)
      let videoId = youTubeLinks[videoIndex+1].videoId
      setCurrentVideoId(videoId)
      let time = youTubeLinks[videoIndex+1].time
      setPlayingVideoTime(time)
      updateWidth()
      //let currentWholeText = youTubeLinks[videoIndex+1].wholeText
      //setWholeText(currentWholeText)
      let firstTimeIndex = youTubeLinks[videoIndex+1].firstTimeIndex
      setFirstTimeIndex(firstTimeIndex)
      setShowSubtitle(false)
    }
  }
  //handleBack ends

  //handleBug starts
  const handleBug = async(videoId) => {
    console.log(videoId)
    let subtitleObject = {}
    try {
      subtitleObject = await subtitleService.getOne(videoId)
        .then(response => response
        )
      //console.log(subtitleObject)
      let buggyLines = subtitleObject.buggyLines
      //console.log(subtitleObject.buggyLines)
      const youTubeLink = youTubeLinks[videoIndex]
      const timeStamp = youTubeLink.timeStamp
      const hour = timeStamp.substring(0,2)
      const minutes = timeStamp.substring(3,5)
      const seconds = timeStamp.substring(6,8)
      const mseconds = timeStamp.substring(9,12)
      const bugId = `${youTubeLink.videoId}_${hour}${minutes}${seconds}${mseconds}`

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
      //console.log('handleBug worked')
      window.confirm('You found and reported a bug! Thank you for helping us and other learners!')
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

  //S-searchVideoById
  const searchVideoById = async(event) => {
    event.preventDefault()
    try {
      //setWholeText([])
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
      //setWholeText([])
      setFirstTimeIndex(0)
      setPlayingVideoTime(0)
      setAutoplay(0)
      setShowStats(false)
      setYouTubeLinks([])
      setCurrentVideoId('5bfx6BNufdE')
    }
  }
  //E-searchVideoById

  //S-searchBugById
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
  //E-searchBugById

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

  //reset starts
  const reset = () => {
    updateWidth()
    setAbout(false)
    setQuery('')
    setCurrentVideoId('G_O0N3R-Lv8')
    //setWholeText([])
    setFirstTimeIndex(0)
    setPlayingVideoTime(0)
    setAutoplay(0)
    setShowStats(false)
    setYouTubeLinks([])
    setShownSubtitles(null)
    setShownSubtitlesArr([])
    setShowSubtitle(false)
    window.clearTimeout(timeoutId)
  }
  //reset ends

  const handleHome = async(event) => {
    event.preventDefault()
    reset()
    history.push('/')
  }

  const handleLogoButton = async(event) => {
    event.preventDefault()
    reset()
    history.push('/')
  }

  const handleAbout = async(event) => {
    event.preventDefault()
    setAbout(true)
    history.push('/about')
  }

  //S-aboutPage
  const aboutPage = () => (
    <div>
      <Header
        logo = {handleLogoButton}
        about = {handleAbout}
        home = {handleHome}
      />
      <div id='main-container-about' className='container'>
        <About handleKörBara={handleHome}/>
      </div>
      <Footer/>
    </div>
  )
  //E-aboutPage

  //S-appItself
  const appItself = () => (
    <div>
      <Header
        logo = {handleLogoButton}
        about = {handleAbout}
        home = {handleHome}
      />
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
      <div>
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
              handleBug={() => handleBug(currentVideoId)}
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
    </div>
  )
  //E-appItself

  return (
    <div>
      {about ? aboutPage() : appItself()}
    </div>
  )
}

export default AppCopy2
