/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { propTypes } from 'react-country-flag'
import { FaCopy } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import MiniLex from './MiniLex'

const Subtitle = ({
  shownSubtitles,
  shownSubtitlesArr,
  showSubtitle,
  handleShow,
  handleHide,
  query,
  activeQuery,
  listLength,
  triggerSubmission,
  pickWord,
  types,
  length_arr,
  meaning,
  pickedType,
  index,
  miniLexVisible,
  pickedWord
}) => {

  const showWhenVisible = { display: showSubtitle ? '' : 'none' }

  let word = activeQuery
  let puncReg = /[.,"'?!;:]*/
  let startReg = /^/
  let endReg = /$/
  let regex = new RegExp(startReg.source +
        puncReg.source +
        word +
        puncReg.source +
        endReg.source , 'i' )


  const subtitleContent = () => (
    <div id="main-subtitle-container" style={showWhenVisible}>
      <div className="subtitle-empty">
      </div>
      <div id="subtitle-wrapper">
        { listLength > 0 ?
          <div id="subtitle-paragraph">
            {shownSubtitlesArr.map( (word, i=0) =>
              <div key={word + i+1}>
                <span
                  style={{
                    fontWeight: regex.test(word) ? 'bold' : 'normal' ,
                    background: word.length + '-' + word + i+1  === pickedWord ? '#FFB6C1' : ''
                  }}
                  key={word + i+1}
                  id={word.length + '-' + word + i+1}
                  onClick={pickWord}
                  className='subtitle-word'>{`${word}`}
                </span>
                <span key={'whitespace-'+i+1} className='subtitle-unlinked-word'>{' '}</span>
              </div>
            )}
          </div> :
          <div id="subtitle-paragraph">
            {shownSubtitlesArr.map( (word, i=0) =>
              <div key={word + i+1}>
                <span
                  style={{
                    fontWeight: regex.test(word) ? 'bold' : 'normal' ,
                    cursor: word.includes("'") ? 'pointer' : '',
                    textDecoration: word.includes("'") ? 'underline' : ''
                  }}
                  key={word + i+1}
                  id={word}
                  onClick={ word.includes("'") ? triggerSubmission : () => {}}
                  className='subtitle-unlinked-word'>{`${word}`}
                </span>
                <span key={'whitespace-'+i+1} className='subtitle-unlinked-word'>{' '}</span>
              </div>
            )}
          </div>
        }
      </div>
      <div className="subtitle-empty">
      </div>
    </div>
  )


  return (
    <div>
      {shownSubtitles === null ? null : subtitleContent() }
    </div>
  )
}

export default Subtitle
