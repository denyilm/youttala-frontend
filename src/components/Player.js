/* eslint-disable no-unused-vars */
import React from 'react'
import YouTube from 'react-youtube'

const Player = (props) => {

  const showWhenVisible = { display: props.showStats ? '' : 'none' }

  return (
    <div>
      <YouTube videoId={props.videoId} opts={props.opts} onPlay={props.onPlay}></YouTube>
      <div>
        <button onClick={props.handleBack}>back</button>
        <button onClick={props.handleKörOm}>kör om</button>
        <button onClick={props.handleNext}>next</button>
      </div>
      <span style={showWhenVisible}> {props.videoIndex} av {props.length}</span>
    </div>
  )
}

export default Player
