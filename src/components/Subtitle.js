/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {FaCopy} from 'react-icons/fa'
import {FaEye} from 'react-icons/fa'

const Subtitle = ({ shownSubtitles, shownSubtitlesArr, showSubtitle, handleShow, handleHide, query }) => {

  const hideWhenVisible = { display: showSubtitle ? 'none' : '' }
  const showWhenVisible = { display: showSubtitle ? '' : 'none' }

  let word = query
  let puncReg = /[.,"'?!;:]*/
  let startReg = /^/
  let endReg = /$/
  let regex = new RegExp(startReg.source +
        puncReg.source +
        word +
        puncReg.source +
        endReg.source , 'i' )

  const beforeSearch = () => (
    <div className="first-subtitle">
      <div class="yarrak">
        You may find your search result here!
      </div>
    </div>
  )

  const afterSearch = () => (
    <div className="subtitle">
      <div style={showWhenVisible}>
        <span>{shownSubtitles}</span>
        <button>copy</button>
        <button onClick={handleHide}>hide</button>
      </div>
      <div style={hideWhenVisible}>
        <span>See your search result!</span>
        <button onClick={handleShow}>show</button>
      </div>
    </div>
  )

  const afterSearchXd = () => (
    <div>
      <div className="subtitle" style={showWhenVisible}>
        <div class="subtitle-buttons">
          <button class="button"><FaCopy size= {13}/></button>
          <button class="button" onClick={handleHide}><FaEye size={13}/></button>
        </div>
        <div class="subtitle-subtitle">
        <p class="paragraph">
        {shownSubtitlesArr.map( (word, i=0) =>
          <span
            style={{ color: regex.test(word) ? 'red' : 'black' }}
            key={word + i+1}>{word}&nbsp;</span>
        )}
        </p>
        </div>
      </div>

      <div class="hidden-subtitle" style={hideWhenVisible}>
        <div id="three-dots">
          <span></span>
        </div>
        <div id="show-button-bar">
          <button class="button"onClick={handleShow}><FaEye size={13}/></button>
        </div>
      </div>
    </div>
  )


  return (
    <div>
      {shownSubtitles === null ? beforeSearch() : afterSearchXd() }
    </div>
  )
}

export default Subtitle
