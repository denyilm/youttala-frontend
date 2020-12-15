/* eslint-disable no-unused-vars */
import React from 'react'
import YouTube from 'react-youtube'
import { FaBackward } from 'react-icons/fa'
import { FaForward } from 'react-icons/fa'
import { FaRedo } from 'react-icons/fa'
import { FaExclamationCircle } from 'react-icons/fa'

const Player = (props) => {

  const showWhenVisible = { display: props.showStats ? '' : 'none' }
  const showWhenNotVisible = { display: props.showStats ? 'none' : '' }

  return (
    <div className='player'>
      <div className="video">
        <YouTube videoId={props.videoId} opts={props.opts} onPlay={props.onPlay}></YouTube>
      </div>
      <div className="player-bar">
        <div className="empty">

        </div>
        <div className="button-set">
          <div>
            <button className="button" title='Previous video' id='back-button' onClick={props.handleBack}><FaBackward size= {23}/></button>
          </div>
          <div>
            <button className="button" id='restart-button' title='replay' onClick={props.handleKörOm}><FaRedo size= {23}/></button>
          </div>
          <div>
            <button className="button" id='next-button' title='next video' onClick={props.handleNext}><FaForward size= {23}/></button>
          </div>
        </div>
        <div className="extras">
          <span style={showWhenVisible}> {props.videoIndex} av {props.length}</span>
          <span style={showWhenNotVisible}></span>
          <button className="button" title='report a bug' onClick={props.handleBug}><FaExclamationCircle size= {13}/></button>
        </div>
      </div>
    </div>
  )
}

export default Player
