/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from 'react'
import YouTube from 'react-youtube'
import ReactPlayer from 'react-player'
import { FaBackward } from 'react-icons/fa'
import { FaForward } from 'react-icons/fa'
import { FaRedo } from 'react-icons/fa'
import { FaExclamationCircle } from 'react-icons/fa'

const PlayerBar = (props) => {

  const showWhenVisible = { display: props.showStats ? '' : 'none' }
  const showWhenNotVisible = { display: props.showStats ? 'none' : '' }

  return (
    <div id="player-bar">
      <div id="empty-player-bar-top">
      </div>
      <div className="button-set">
        <div>
          <button title='Previous video' id='back-button' onClick={props.handleBack}><FaBackward size= {23}/></button>
        </div>
        <div>
          <button id='restart-button' title='replay' onClick={props.handleKörOm}><FaRedo size= {23}/></button>
        </div>
        <div>
          <button id='next-button' title='next video' onClick={props.handleNext}><FaForward size= {23}/></button>
        </div>
      </div>
      <div className="extras">
        <span style={showWhenVisible}> {props.videoIndex} of {props.length}</span>
        <span style={showWhenNotVisible}></span>
        <button className="button" id='bug-button' title='report a bug' onClick={props.handleBug}><FaExclamationCircle size= {11}/></button>
      </div>
    </div>
  )
}

export default PlayerBar
