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
    <div id='about-container'>
      <h1 id='about-title'>Hej!</h1>
      <div id='about-description'>
        Welcome to youttala!
        <br></br>
        <br></br>
        youttala is a web application where Swedish learners can instantly learn how
        Swedish words are actually pronounced by watching YouTube!
        In youttala, you can hear the pronunciation of a word from real Swedish speakers in real use cases!
        Just type the word you want to hear and search.
        <br></br>
        <br></br>
         We hope that youttala would be a useful tool and wish you good luck in the learning journey!
        <br></br>
        <br></br>
        <span>Before we start, please take a look at the quick guideline!<a className='angle' style={{ display: showGuide ? 'none' : '' }} onClick={handleShow}><FaAngleDown size={13}/></a><a className='angle' style={{ display: showGuide ? '' : 'none' }} onClick={handleShow}><FaAngleUp size={13}/></a></span>
        <div id='guideline' style={{ display: showGuide ? '' : 'none' }}>
          <div id='guideline-content'>
            <FaSpinner className='spinner' size={10}/> For now, it is only possible to search a word,
         so if you try to search a particle verb or a sentence, it would not work.
            <br></br>
            <br></br>
            <FaSpinner className='spinner' size={10}/> We would be very happy if you help us and other learners by reporting bugs by clicking on
        this sign <FaExclamationCircle size={10}/> that is located in the right-bottom corner of the player console.
            <br></br>
            <br></br>
            <FaSpinner className='spinner' size={10}/> By bugs, we mean unmatching subtitles. Sometimes,
        the piece of subtitle could be a paraphrased version of what is said rather than word by word captions.
        We would like to identify and remove those instances to provide you a better experience!
          </div>
        </div>
        <br></br>
        <br></br>
        <a onClick={props.handleKörBara} style={{ display: showGuide ? 'none' : '' }} id='kör-bara'>Nu kör vi! <FaHeadphones size={17}/></a>
        <div className='complete'></div>
      </div>
    </div>
  )
}

export default About