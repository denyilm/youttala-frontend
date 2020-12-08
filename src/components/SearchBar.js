/* eslint-disable no-unused-vars */
import React from 'react'

const SearchBar = (props) => {
  return (
    <div>
      <form onSubmit = {props.handleSubmit}>
        <input value={props.query} type='text' onChange={props.handleQueryChange}></input>
        <button type='submit'>search</button>
      </form>
    </div>
  )
}

export default SearchBar
