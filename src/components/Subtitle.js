/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaCopy } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'

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
      <div className="yarrak">
        You may find your search result here!
      </div>
    </div>
  )

  const afterSearch = () => (
    <div>
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
        <div className="subtitle-buttons">
          <button style ={{ display: 'none' }} className="button"><FaCopy size= {13}/></button>
          <button className="button" title='hide the search result' onClick={handleHide}><FaEye size={13}/></button>
        </div>
        <div className="subtitle-subtitle">
          <p className="paragraph">
            {shownSubtitlesArr.map( (word, i=0) =>
              <span
                style={{ color: regex.test(word) ? 'red' : 'black' }}
                key={word + i+1}>{word}&nbsp;</span>
            )}
          </p>
        </div>
      </div>
      <div className="hidden-subtitle" style={hideWhenVisible}>
        <div id="three-dots">
          <span></span>
        </div>
        <div id="show-button-bar">
          <button className="button" title='show the search result' onClick={handleShow}><FaEye size={13}/></button>
        </div>
      </div>
    </div>
  )
  /*
  const afterSearchXd = () => (
    <div>
      <div style={showWhenVisible}>
        {shownSubtitlesArr.map( (word, i=0) =>
          <span
            style={{ color: regex.test(word) ? 'red' : 'black' }}
            key={word + i+1}>{word}&nbsp;</span>
        )}
        <button>copy</button>
        <button onClick={handleHide}>hide</button>
      </div>
      <div style={hideWhenVisible}>
        <span>See your search result!</span>
        <button onClick={handleShow}>show</button>
      </div>
    </div>
  )
  */


  return (
    <div>
      {shownSubtitles === null ? beforeSearch() : afterSearchXd() }
    </div>
  )
}

export default Subtitle
