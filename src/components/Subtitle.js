/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

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
    <div>
        The line that contains your search result will be stored here!
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


  return (
    <div>
      {shownSubtitles === null ? beforeSearch() : afterSearchXd() }
    </div>
  )
}

export default Subtitle
