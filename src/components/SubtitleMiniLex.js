/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { propTypes } from 'react-country-flag'
import { FaCopy } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import MiniLex from './MiniLex'

const SubtitleMiniLex = ({
  shownSubtitles,
  shownSubtitlesArr,
  showSubtitle,
  handleShow,
  handleHide,
  query,
  pickWord,
  types,
  length_arr,
  meaning,
  pickedType,
  index,
  miniLexVisible,
  pickedWord,
  pickMe,
  pickMeaning
}) => {

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

  /*
  const afterSearchXd = () => (
    <div>
      <div className="subtitle" style={showWhenVisible}>
        <div id="subtitle-empty">

        </div>
        <div className="subtitle-subtitle">
          <div className="paragraph">
            {shownSubtitlesArr.map( (word, i=0) =>
              <div key={word + i+1}>
                <span
                  style={{
                    color: regex.test(word) ? 'red' : 'black' ,
                    background: word.length + '-' + word + i+1  === pickedWord ? 'rgb(224, 241, 247)' : ''
                  }}
                  key={word + i+1}
                  value={word+i+1}
                  id={word.length + '-' + word + i+1}
                  onClick={pickWord}
                  className='subtitle-word'>{`${word}`}
                </span>
                {
                  length_arr > 0 ?
                    <MiniLex
                      word={word}
                      pickedWord={pickedWord}
                      lexId={word.length + '-' + word + i+1}
                      types={types}
                      length_arr={length_arr}
                      meaning={meaning}
                      pickedType={pickedType}
                      index={index}
                      pickMe={pickMe}
                      pickMeaning={pickMeaning}
                    /> :
                    <span style={{ display: 'none' }}></span>
                }
              </div>
            )}
          </div>
        </div>
        <div id="subtitle-empty">

        </div>
      </div>
    </div>
  )
  */

  const subtitleContent = () => (
    <div id="main-subtitle-container" style={showWhenVisible}>
      <div className="subtitle-empty">

      </div>
      <div id="subtitle-wrapper-minilex">
        <div id="subtitle-paragraph-minilex">
          {shownSubtitlesArr.map( (word, i=0) =>
            <div key={word + i+1}>
              <span
                style={{
                  fontWeight: regex.test(word) ? 'bold' : 'normal' ,
                  background: word.length + '-' + word + i+1  === pickedWord ? 'rgb(224, 241, 247)' : ''
                }}
                key={word + i+1}
                value={word+i+1}
                id={word.length + '-' + word + i+1}
                onClick={pickWord}
                className='subtitle-word'>{`${word}`}
              </span>
              {
                length_arr > 0 ?
                  <MiniLex
                    word={word}
                    pickedWord={pickedWord}
                    lexId={word.length + '-' + word + i+1}
                    types={types}
                    length_arr={length_arr}
                    meaning={meaning}
                    pickedType={pickedType}
                    index={index}
                    pickMe={pickMe}
                    pickMeaning={pickMeaning}
                  /> :
                  <span style={{ display: 'none' }}></span>
              }
              <span key={'whitespace-'+i+1} className='subtitle-unlinked-word'>{' '}</span>

            </div>
          )}
        </div>
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

export default SubtitleMiniLex
