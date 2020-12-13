/* eslint-disable no-unused-vars */
import React from 'react'
import YouTube from 'react-youtube'
import {FaBackward} from 'react-icons/fa'
import {FaForward} from 'react-icons/fa'
import {FaRedo} from 'react-icons/fa'
import {FaExclamationCircle} from 'react-icons/fa'



const Player = (props) => {

  const showWhenVisible = { display: props.showStats ? '' : 'none' }

  return (
    <div>
      <div class="video">
      <YouTube videoId={props.videoId} opts={props.opts} onPlay={props.onPlay}></YouTube>
      </div>
      <div class="player-bar">
        <div class="empty">

        </div>
        <div class="button-set">
        <div>
          <button class="button" onClick={props.handleBack}><FaBackward size= {31}/></button>
        </div>
        <div>
          <button class="button" onClick={props.handleKörOm}><FaRedo size= {31}/></button>
        </div>
        <div>
          <button class="button" onClick={props.handleNext}><FaForward size= {31}/></button>
        </div>
      </div>
      <div class="extras">
        <span> {props.videoIndex} av {props.length}</span>
        <button class="button" onClick={props.handleNext}><FaExclamationCircle size= {15}/></button>
      </div>
      </div>
    </div>
  )
}

export default Player



