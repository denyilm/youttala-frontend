/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable no-unused-vars */
import React from 'react'
import { FaKeyboard } from 'react-icons/fa'
import { MdShuffle } from 'react-icons/md'

const SearchBar = (props) => {

  const hideShowLetters = { display: props.lettersVisible ? '' : 'none' }
  const keyboardStyle = { color: props.lettersVisible ? 'black' : 'gray' }

  return (
    <div id='brand-bar-container'>
      <div id='brand-container' className='just-button' onClick={props.logo}>
        <span id='brand-span'>youttala</span>
      </div>
      <div id='form-wrapper'>
        <form id='input-wrapper' onSubmit={props.handleSubmit}>
          <input
            autoFocus
            id='input-field'
            value={props.query}
            type='text'
            placeholder='how to pronounce'
            onChange={props.handleQueryChange}>
          </input>
          <div id='swedish-letters-container' style={hideShowLetters}>
            <span className='swedish-letter-span' id='å' onClick={props.handleLetter}>å</span>
            <span className='swedish-letter-span' id='ä' onClick={props.handleLetter}>ä</span>
            <span className='swedish-letter-span' id='ö' onClick={props.handleLetter}>ö</span>
          </div>
          <div id='input-buttons-wrapper'>
            <div id='keyboard-wrapper'>
              <span title='Swedish letters' className='just-button' id='keyboard-button' onClick={props.handleKeyboard} style={keyboardStyle}><FaKeyboard id='keyboard-button-icon'/></span>

            </div>
            <span title='Bring me a word' className='just-button' id='shuffle-button' onClick={props.handleRandomWord}><MdShuffle id='shuffle-button-icon'/></span>
          </div>
        </form>
        <div id='search-button-wrapper'>
          <button id='search-button' form='input-wrapper' type='submit'>search</button>
        </div>
      </div>
      <div id='welcome-description-container'>
        <p id='welcome-description'>
          type a Swedish word and search to watch YouTube clips in which the word is used!
        </p>
      </div>
    </div>
  )
}

export default SearchBar