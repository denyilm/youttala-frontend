/* eslint-disable no-unused-vars */
import React from 'react'

const SearchBar = (props) => {
  return (
    <div>
      <form class="form" onSubmit = {props.handleSubmit}>
        <input autoFocus class="searchbar" value={props.query} type='text' onChange={props.handleQueryChange}></input>
        <button class="search-button" type='submit'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar
