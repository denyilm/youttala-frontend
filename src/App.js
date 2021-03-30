/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ReactGA, { set } from 'react-ga'
//functions
import getMiniLexAfterSearch from './functions/getMiniLexAfterSearch'
import getSynchedSubtitle from './functions/getSynchedSubtitle'
import getWordType from './functions/getWordType'
import getPickedWord from './functions/getPickedWord' //for picking a bojning or a suggested word after a failed search
import getPickedWordInPara from './functions/getPickedWordInPara' //for picking a word from the subtitle paragraph
import checkMiniLex from './functions/checkMiniLex'
import submitWord from './functions/submitWord'
import getFailureMessage from './functions/getFailureMessage'
import synchSubtitles from './functions/synchSubtitles'
import getRandomWord from './functions/getRandomWord'
import playPreviousVideo from './functions/playPreviousVideo'
import replayCurrentVideo from './functions/replayCurrentVideo'
import playNextVideo from './functions/playNextVideo'
import nextMeaning from './functions/nextMeaning'
import previousMeaning from './functions/previousMeaning'
import secondsForward from './functions/secondsForward'
import secondsBackward from './functions/secondsBackward'
import fetchData from './functions/fetchData'
import resetLinkAtStart from './functions/resetLinkAtStart'
import updateYouTubeLinks from './functions/updateYouTubeLinks'
import submitWordLex from './functions/submitWordLex'
import getSynchedSubtitleNotReady from './functions/getSynchedSubtitleNotReady'
import detectWindowSize from './functions/detectWindowSize'
//components
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Lexicon from './components/Lexicon'
import ReactPlayer from 'react-player'
import Subtitle from './components/Subtitle'
import SubtitleMiniLex from './components/SubtitleMiniLex'
import Footer from './components/Footer'
import About from './components/About'
import PlayerBarControls from './components/PlayerBarControls'
import PrivacyPolicy from './components/PrivacyPolicy'

const App = () => {
  const linkAtStart = 'https://www.youtube.com/watch?v=G_O0N3R-Lv8'
  const ref = React.createRef() //ref to the player
  const history = useHistory()
  //app
  const [fetchReady, setFetchReady] = useState(false)
  const [appReady, setAppReady] = useState(false)
  const [showWelcomeText, setShowWelcomeText] = useState(true)
  const [hideVideo, setHideVideo] = useState(true)
  const [lexReady, setLexReady] = useState(false)
  const [resultsReady, setResultsReady] = useState(false)
  const [updateReady, setUpdateReady] = useState(false)
  const [page, setPage] = useState('policy')
  const [isRreset, setIsReset] = useState(true)
  const [subtitles, setSubtitles] = useState([])
  const [entries, setEntries] = useState([])
  const [wordlist, setWordlist] = useState([])
  const [query, setQuery] = useState('')
  const [activeQuery, setActiveQuery] = useState('')
  const [youTubeLinks, setYouTubeLinks] = useState([])
  const [youTubeLink, setYouTubeLink] = useState('https://www.youtube.com/watch?v=G_O0N3R-Lv8')
  const [videoIndex, setVideoIndex] = useState(0)
  const [currentVideoId, setCurrentVideoId] = useState('G_O0N3R-Lv8')
  const [shownSubtitles, setShownSubtitles] = useState(null)
  const [shownSubtitlesArr, setShownSubtitlesArr] = useState([])
  const [showSubtitle ,setShowSubtitle] = useState(false)
  const [showStats, setShowStats] = useState(false)
  //player
  const [playingVideoTime, setPlayingVideoTime] = useState(0)
  const [width, setWidth] = useState('480px')
  const [height, setHeight] = useState('270px')
  const [autoplay, setAutoplay] = useState(false)
  //synched subtitles
  const [wholeText, setWholeText] = useState([])  // {timeStampAsText, secondsArr, miliSecondsArr, subtitle: [arr]}
  const [unSubbedPartArr, setUnSubbedPartArr] = useState([]) //only miliSeconds [arr]
  const [subtitleIndex, setSubtitleIndex] = useState(null) // theList[i].substitleIndex
  const [submitted, setSubmitted] = useState(false) //to trigger associated useEffect
  const [subTimeoutId_1, setSubTimeoutId_1] = useState(null) //video onPlay miliseconds to the very next subtitle's miliSecondsArr[0]
  const [subTimeoutId_3, setSubTimeoutId_3] = useState(null) //video onPlay milisecons to the the very next subtitle's miliSecondsArr[1]
  const [timeDiff1, setTimeDiff1] = useState(null) //video onPlay miliseconds to the very next subtitle's miliSecondsArr[0]
  const [timeDiff3, setTimeDiff3] = useState(null) //video onPlay milisecons to the the very next subtitle's miliSecondsArr[1]
  //main lex
  const [wordResults, setWordResults] = useState([])
  const [wordTypes, setWordTypes] = useState([])
  const [wordType, setWordType] = useState('')
  const [wordMeanings, setWordMeanings] = useState([])
  const [shownMeanings, setShownMeanings] = useState([])
  const [shownMeaningIndex, setShownMeanigIndex] = useState(0)
  //mini lex
  const [miniWordResults, setMiniWordResults] = useState([])
  const [miniWordTypes, setMiniWordTypes] = useState([])
  const [miniWordType, setMiniWordType] = useState('')
  const [miniWordMeanings, setMiniWordMeanings] = useState([])
  const [miniShownMeanings, setMiniShownMeanings] = useState([])
  const [miniShownMeaningIndex, setMiniShownMeanigIndex] = useState(0)
  const [miniPickedWord, setMiniPickedWord] = useState('')
  //searchbar letters
  const [lettersVisible, setLettersVisible] = useState(false)

  useEffect(() => {
    ReactGA.initialize('UA-186348116-1')
    ReactGA.pageview('/')
    ReactGA.pageview('/about')
    ReactGA.pageview('/privacypolicy')
  },[])

  //Fetch data
  useEffect(() => {
    fetchData(
      fetchReady,
      history.location.pathname,
      setEntries,
      setSubtitles,
      setWordlist,
      setAppReady,
      setPage,
    )
  },[fetchReady])

  //set video dimensions at start
  useEffect(() => {
    detectWindowSize(window.innerWidth, setWidth, setHeight)
    //document.getElementById('input-field').focus()
  },[])

  //Simulate laggy fetch
  /*
  useEffect(() => {
    window.setTimeout(() => {
      setAppReady(true)
    }, 10000)
  },[])
  */

  //
  useEffect(() => {
    updateYouTubeLinks(subtitles, youTubeLinks, setYouTubeLinks)
    console.log('Is the update ready? ', updateReady)
  }, [updateReady])

  //update the list as soon as the data is fetched
  useEffect(() => {
    console.log('Is the app ready? ', appReady)
    console.log('Is the results ready? ', resultsReady)
    if(youTubeLinks.length > 0 && appReady){
      setUpdateReady(true)
    }
  },[appReady, resultsReady])

  //useEffect that is used to synch the subtitles
  useEffect(() => {
    synchSubtitles(
      submitted,
      youTubeLinks,
      subTimeoutId_1,
      subTimeoutId_3,
      ref,
      wholeText,
      unSubbedPartArr,
      setTimeDiff1,
      setTimeDiff3,
      setSubtitleIndex,
      setSubmitted,
      setShowSubtitle,
      setShownSubtitles,
      setShownSubtitlesArr,
      setSubTimeoutId_1,
      setSubTimeoutId_3,
      setMiniWordResults,
    )
  }, [subtitleIndex, submitted])

  //iPhone 5/SE 320x568
  //iPhone 6/7/8 375x667
  //iPhone 6/7/8 Plus 414x736
  //iPhone X 375x812
  //iPad 768x1024
  //iPad Pro 1024x1366

  //S-window resizing
  window.addEventListener('resize', (event) => {
    event.preventDefault()
    if(window.innerWidth < 370) {
      //iPhone 5
      setWidth('310px')
      setHeight('200px')
    } else if(window.innerWidth < 415 && window.innerWidth > 370) {
      //iPhone 6/7/8
      setWidth('368px')
      setHeight('207px')
    } else if(window.innerWidth < 501 && window.innerWidth > 415) {
      //smaller screen and iPhone Plus
      setWidth('368px')
      setHeight('207px')
    } else {
      //usual PC screen, iPad
      setWidth('480px')
      setHeight('270px')
    }
  })
  //E-window resizing

  //handle goBack in the browser
  window.addEventListener('popstate',(event) => {
    event.preventDefault()
    let page = history.location.pathname
    let length = page.length
    if(!isRreset){
      reset()
    }
    setPage(page.substring(1,length))
  })
  //

  //S-toPage
  const toPage = (page) => (event) => {
    event.preventDefault()
    reset()
    if(history.location.pathname === '/' && page === ''){
      document.getElementById('input-field').focus()
    }
    setPage(page)
    history.push(`/${page}`)
    window.scrollTo(0, 0)
  }
  //E-toPage

  //S-reset
  const reset = () => {
    setHideVideo(true)
    setQuery('')
    setActiveQuery('')
    setIsReset(true)
    setCurrentVideoId('G_O0N3R-Lv8')
    setYouTubeLink(resetLinkAtStart(linkAtStart, youTubeLink))
    setPlayingVideoTime(0)
    setAutoplay(false)
    setShowStats(false)
    setYouTubeLinks([])
    setShownSubtitles(null)
    setShownSubtitlesArr([])
    setShowSubtitle(false)
    setWordResults([])
    setMiniWordResults([])
    setSubmitted(false)
    setShowWelcomeText(true)
  }
  //E-reset

  //s-resetQuery
  const resetQuery = ( query, text ) => {
    setHideVideo(true)
    setCurrentVideoId('G_O0N3R-Lv8')
    setYouTubeLink(linkAtStart)
    setPlayingVideoTime(0)
    setAutoplay(false)
    setShowStats(false)
    setYouTubeLinks([])
    let message = getFailureMessage(query, text)
    setShownSubtitles(message.shownText)
    setShownSubtitlesArr(message.shownSubtitlesArr)
    setShowSubtitle(true)
    setMiniWordResults([])
    setActiveQuery('')
  }
  //e-resetQuery

  //handleQueryChange starts
  const handleQueryChange = (event) => setQuery(event.target.value)
  //handleQueryChange starts

  //S-handleKeyboard
  const handleKeyboard = () => {
    document.getElementById('input-field').focus()
    setLettersVisible(!lettersVisible)
  }
  //E-handleKeyboard

  //S-handleLetter
  const handleLetter = (event) => {
    event.preventDefault()
    setQuery(query+event.target.id)
    document.getElementById('input-field').focus()
  }
  //E-handleLetter

  //S-handleRandomWord
  const handleRandomWord = (event) => {
    event.preventDefault()
    setQuery(getRandomWord())
    document.getElementById('input-field').focus()
  }
  //E-handleRandomWord

  //S-submission
  const submission = (query) => {
    submitWord(query, appReady, subtitles, setFetchReady)
      .then(response => {
        //console.log(response)
        try {
          setApp(response.youTubeLinkList)
          setActiveQuery(query)
          setResultsReady(true)
        } catch (error) {
          switch (query) {
          case '':
            resetQuery(query, 'please type something')
            break
          default:
            resetQuery( query, 'nothing found for ' )
            break
          }
          setSubmitted(false)
        }
      })
  }
  //E-submission

  //S-submissionLex
  const submissionLex = (query) => {
    submitWordLex(query, appReady, entries, wordlist)
      .then(response => {
        try {
          setLex(response)
          { response.wordResults.length === 0 ? setLexReady(false) : setLexReady(true) }
        } catch (error) {
          setLexReady(false)
        }
      })
  }
  //E-submissionLex

  //S-handleSubmit
  const handleSubmit = async(event) => {
    event.preventDefault()
    setHideVideo(false)
    setShowWelcomeText(false)
    submission(query)
    submissionLex(query)
  }
  //E-handleSubmit

  //S-setApp
  const setApp = (youTubeLinkList) => {
    setHideVideo(false)
    setIsReset(false)
    setYouTubeLinks(youTubeLinkList)
    setSynchedSubtitle(youTubeLinkList, 0)
    setVideoIndex(0)
    //setCurrentVideoId(youTubeLinkList[0].videoId)
    setYouTubeLink(youTubeLinkList[0].youtubeLink)
    setPlayingVideoTime(youTubeLinkList[0].time)
    setAutoplay(true)
    setShowSubtitle(false)
    setShowStats(true)
    setShowWelcomeText(false)
  }
  //E-setApp

  //S-setLex
  const setLex = (lexObj) => {
    setWordResults(lexObj.wordResults)
    setShownMeanigIndex(lexObj.shownMeaningIndex)
    setWordMeanings(lexObj.wordMeanings)
    setWordTypes(lexObj.wordTypes)
    setWordType(lexObj.wordType)
    setShownMeanings(lexObj.shownMeanings)
  }
  //E-setLex

  //S-setMiniLex
  const setMiniLex = (pickedWord) => {
    let miniLexObj = getMiniLexAfterSearch(pickedWord, entries, wordlist)
    setMiniShownMeanigIndex(miniLexObj.miniShownMeaningIndex)
    setMiniWordResults(miniLexObj.miniWordResults)
    setMiniWordMeanings(miniLexObj.miniWordMeanings)
    setMiniWordTypes(miniLexObj.miniWordTypes)
    setMiniWordType(miniLexObj.miniWordType)
    setMiniShownMeanings(miniLexObj.miniShownMeanings)
  }
  //E-setMiniLex

  //S-setSynchedSubtitle
  const setSynchedSubtitle = (youTubeLinkList, i) => {
    let synchedSubtitleObj = {}
    if(appReady){
      synchedSubtitleObj = getSynchedSubtitle(youTubeLinkList, i)
    } else {
      synchedSubtitleObj = getSynchedSubtitleNotReady(youTubeLinkList,i)
    }
    //console.log(synchedSubtitleObj)
    setWholeText(synchedSubtitleObj.wholeText)
    setUnSubbedPartArr(synchedSubtitleObj.unSubbedPart)
    setSubtitleIndex(synchedSubtitleObj.subtitleIndex)
    setSubmitted(false)
  }
  //E-setSynchedSubtitle

  //S-selectType
  const selectType = (event) => {
    event.preventDefault()
    setShownMeanigIndex(0)
    setWordType(getWordType(event.target.id))
    setShownMeanings(wordMeanings.filter(meaning => meaning.type === event.target.id))
  }
  //E-selectType

  //S-selectMiniType
  const selectMiniType = (event) => {
    event.preventDefault()
    setMiniShownMeanigIndex(0)
    setMiniWordType(getWordType(event.target.id))
    setMiniShownMeanings(miniWordMeanings.filter(meaning => meaning.type === event.target.id))
  }
  //E-selectMiniType

  //S-selectMeaning
  const selectMeaning = (event) => {
    event.preventDefault()
    setShownMeanigIndex(Number(event.target.id))
  }
  //E-selectMeaning

  //S-selectMeaning
  const selectMiniMeaning = async(event) => {
    event.preventDefault()
    setMiniShownMeanigIndex(Number(event.target.id))
  }
  //E-selectMeaning

  //S-selectBojning
  const selectBojning = (event) => {
    event.preventDefault()
    setQuery(event.target.id)
    submission(event.target.id)
  }
  //E-selectBojning

  //S-triggerSubmission, after clicking on a word after a failed search
  const triggerSubmission = async(event) => {
    event.preventDefault()
    let pickedWord = getPickedWord(event.target.id)
    setQuery(pickedWord)
    submission(pickedWord)
    submissionLex(pickedWord)
  }
  //E-triggerSubmission

  //S-selectWord
  const selectWord = async(event) => {
    event.preventDefault()
    let pickedSpan = event.target.id
    let pickedWord = getPickedWordInPara(pickedSpan).toLowerCase()
    let player = ref.current.getInternalPlayer()
    setMiniPickedWord(checkMiniLex(player, pickedSpan, miniPickedWord))
    setMiniLex(pickedWord)
  }
  //E-selectWord

  //S-nextMeaning
  const handleNextMeaning = async(event) => {
    event.preventDefault()
    nextMeaning(
      shownMeaningIndex,
      shownMeanings,
      setShownMeanigIndex
    )
  }
  //E-nextMeaning

  //S-previousMeaning
  const handlePreviousMeaning = async(event) => {
    event.preventDefault()
    previousMeaning(
      shownMeaningIndex,
      setShownMeanigIndex
    )
  }
  //E-previousMeaning

  //S-opts
  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      cc_lang_pref: 'sv',
      autoplay: autoplay,
      cc_load_policy: 1,
      enablejsapi: 1,
    },
  }
  //E-opts

  //S-onPlay
  const onPlay = async(event) => {
    setSubmitted(true)
  }
  //E-onPlay

  //S-onPause
  const onPause = async(event) => {
    setSubmitted(false)
  }
  //E-onPause

  //S-handleBack
  const handleBack = async(event) => {
    event.preventDefault()
    playPreviousVideo(
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
    )
  }
  //E-handleBack

  //S-handleKörOm
  const handleKörOm = async(event) => {
    event.preventDefault()
    replayCurrentVideo(
      youTubeLinks,
      setSubmitted,
      setShowSubtitle,
      youTubeLink,
      videoIndex,
      setYouTubeLink,
      setSynchedSubtitle
    )
  }
  //E-handleKörOm

  //S-handleNext
  const handleNext = async(event) => {
    event.preventDefault()
    playNextVideo(
      videoIndex,
      youTubeLinks,
      setVideoIndex,
      setCurrentVideoId,
      setYouTubeLink,
      setPlayingVideoTime,
      setShowSubtitle,
      setSynchedSubtitle
    )
  }
  //E-handleNext

  //S-handleBug
  const handleBug = async(videoId) => {
    console.log(videoId)
    window.confirm('You found and reported a bug! Thank you for helping us and other learners!')
  }
  //E-handleBug

  //S-hide/show
  const handleShow = () => setShowSubtitle(true)
  const handleHide = () => setShowSubtitle(false)
  //E-hide/show

  //S-handleTenSecondsForward
  const handleTenSecondsForward = () => {
    secondsForward(ref, 5)
  }
  //S-handleTenSecondsForward

  //S-handleTenSecondsBackward
  const handleTenSecondsBackward = () => {
    secondsBackward(ref, 5)
  }
  //E-handleTenSecondsBackward

  //S-aboutPage
  const AboutPage = () => (
    <div>
      <div id='main-container-about' className='container'>
        <About logo={toPage('')}/>
      </div>
    </div>
  )
  //E-aboutPage

  //S-PrivacyPolicy
  const PrivacyPolicyPage = () => (
    <div>
      <PrivacyPolicy
        logo={toPage('')}/>
    </div>
  )

  //S-appItself
  const AppItself = () => (
    <div id='main-container'>
      <Header
        logo = {toPage('')}
        about = {toPage('about')}/>
      <SearchBar
        logo={toPage('')}
        query={query}
        handleQueryChange={handleQueryChange}
        handleSubmit={handleSubmit}
        handleKeyboard={handleKeyboard}
        lettersVisible={lettersVisible}
        handleLetter={handleLetter}
        handleRandomWord={handleRandomWord}/>
      {lexReady && wordResults.length > 0 ?
        <Lexicon
          types={wordTypes}
          pickMe={selectType}
          meaning={shownMeanings[shownMeaningIndex]}
          index={shownMeaningIndex}
          length_arr={shownMeanings.length}
          back={handlePreviousMeaning}
          next={handleNextMeaning}
          pickedType={wordType}
          pickMeaning={selectMeaning}
          pickBojning={selectBojning}
        /> :
        null }
      <div id='player-container'>
        <div id='youTube-player-container'>
          <ReactPlayer
            ref={ref}
            onPlay={onPlay}
            onPause={onPause}
            url={youTubeLink}
            height={height}
            width={width}
            playing={autoplay}
            controls={true}
            config={opts}/>
        </div>
        <PlayerBarControls
          handleBack={handleBack}
          handleKörOm={handleKörOm}
          handleNext={handleNext}
          handleTenSecondsForward={handleTenSecondsForward}
          handleTenSecondsBackward={handleTenSecondsBackward}
          showStats={showStats}
          query={query}
          activeQuery={activeQuery}
          videoIndex={videoIndex+1}
          length={youTubeLinks.length}
          handleBug={() => handleBug(currentVideoId)}
        />
      </div>
      {
        miniWordResults.length > 0 ?
          <SubtitleMiniLex
            showSubtitle={showSubtitle}
            shownSubtitles={shownSubtitles}
            shownSubtitlesArr={shownSubtitlesArr}
            handleShow={handleShow}
            handleHide={handleHide}
            query={query}
            activeQuery={activeQuery}
            types={miniWordTypes}
            pickMe={selectMiniType}
            pickMeaning={selectMiniMeaning}
            pickWord={selectWord}
            meaning={miniShownMeanings[miniShownMeaningIndex]}
            index={miniShownMeaningIndex}
            length_arr={miniShownMeanings.length}
            pickedType={miniWordType}
            pickedWord={miniPickedWord}
          /> :
          <Subtitle
            showSubtitle={showSubtitle}
            shownSubtitles={shownSubtitles}
            shownSubtitlesArr={shownSubtitlesArr}
            handleShow={handleShow}
            handleHide={handleHide}
            query={query}
            activeQuery={activeQuery}
            pickWord={selectWord}
            listLength={youTubeLinks.length}
            triggerSubmission={triggerSubmission}
            pickedWord={miniPickedWord}
          />
      }
      <div id='fill-container'></div>
    </div>
  )
  //E-appItself

  const content = () => {
    if(page === ''){
      return AppItself()
    } else if(page === 'about'){
      return AboutPage()
    } else if(page === 'privacypolicy'){
      return PrivacyPolicyPage()
    }
  }

  return (
    <div id='page-container'>
      <Header
        logo = {toPage('')}
        about = {toPage('about')}/>
      {content()}
      <Footer
        logo = {toPage('')}
        about = {toPage('about')}
        policy = {toPage('privacypolicy')}/>
    </div>
  )
}

export default App