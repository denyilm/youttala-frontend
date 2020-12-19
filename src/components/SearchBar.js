/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable no-unused-vars */
import React from 'react'


const SearchBar = (props) => {
  return (
    <div>
      <form className="form" onSubmit = {props.handleSubmit}>
        <input autoFocus className="searchbar" value={props.query} type='text' placeholder='Hur uttalar man...' onChange={props.handleQueryChange}></input>
        <button className="search-button" type='submit'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar
