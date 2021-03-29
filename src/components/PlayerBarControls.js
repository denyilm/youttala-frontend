/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from 'react'
import { FaBackward, FaStepBackward } from 'react-icons/fa'
import { FaForward, FaStepForward } from 'react-icons/fa'
import { FaRedo } from 'react-icons/fa'
import { FaExclamationCircle } from 'react-icons/fa'
import { GrUndo, GrRedo } from 'react-icons/gr'

const PlayerBarControls = (props) => {

  const showWhenVisible = { display: props.showStats ? '' : 'none' }
  const showWhenNotVisible = { display: props.showStats ? 'none' : '' }

  return (
    <div id="player-bar" style={showWhenVisible}>
      <div id="empty-player-bar-top">

      </div>
      <div id="player-control-button-set">
        <div className='seek-button-wrapper' onClick={props.handleTenSecondsBackward} title='5s backward'>
          <span className="just-button" title='5s backward' id='seek-backward-button' ><GrUndo id='undo-icon'/></span>
        </div>
        <span className="just-button" title='Previous video' id='previous-video-button' onClick={props.handleBack}><FaBackward id='previous-video-icon'/></span>
        <span className="just-button" title='replay' id='replay-button' onClick={props.handleKörOm}><FaRedo id='replay-icon'/></span>
        <span className="just-button" title='next video' id='next-button' onClick={props.handleNext}><FaForward id='next-video-icon'/></span>
        <div className='seek-button-wrapper' onClick={props.handleTenSecondsForward} title='5s forward'>
          <span className="just-button" title='5s forward' id='seek-backward-button' ><GrRedo id='redo-icon'/></span>
        </div>
      </div>
      <div id="extras-player-bar">
        <span id='stats-text' style={showWhenVisible}><strong>{props.query}</strong> / {props.videoIndex} of {props.length} </span>
        <span style={showWhenNotVisible}></span>
        <span className="just-button" id='bug-button' style={showWhenVisible} title='report a bug' onClick={props.handleBug}><FaExclamationCircle id='bug-icon' /></span>
      </div>
    </div>
  )
}

export default PlayerBarControls
