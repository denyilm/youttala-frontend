/* eslint-disable react/no-unescaped-entities */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaHeadphones } from 'react-icons/fa'
import { FaExclamationCircle, FaAngleDown, FaAngleUp, FaSpinner } from 'react-icons/fa'

const About = (props) => {
  const [showGuide, setShowGuide] = useState(false)

  const handleShow = async(event) => {
    event.preventDefault()
    setShowGuide(!showGuide)
  }


  return (
    <div id='main-container'>
      <div className='brand-wrapper-in-other-pages'>
        <div id='brand-container' className='just-button' onClick={props.logo}>
          <span id='brand-span'>youttala</span>
        </div>
      </div>
      <br></br>
      <br></br>
      <div id='about-description'>
        Welcome to youttala!
        <br></br>
        <br></br>
        - youttala is a web application where you can instantly learn how
        Swedish words are pronounced and used in the context by watching YouTube.
        Just type the word you want to hear and search!
        <br></br>
        <br></br>
        - There is also an embedded lexicon in the app that will show the English translations, the forms, the definition and the synonyms of the word you searched for!
        <br></br>
        <br></br>
        - Moreover, you can click on a word in the subtitle to get the same type of information in a tiny format! The video will be paused when you click on a word. Click again on the word to play the video!
        <br></br>
        <br></br>
        - The lexicon is downloaded from <a href='http://folkets-lexikon.csc.kth.se/folkets/folkets.en.html' target='_blank' rel="noreferrer" title="Visit The People's Dictionary">The People's Dictionary/Folkets lexikon</a> and used under the <a href='https://creativecommons.org/licenses/by/2.0/' target='_blank' rel="noreferrer" title='Visit Creative Commons to access the license'>Distributed Creative Commons Attribution-Share Alike 2.5 Generic license.</a>
        <br></br>
        <br></br>
      </div>
      <div id='fill-container'></div>
    </div>
  )
}

export default About