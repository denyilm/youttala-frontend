/* eslint-disable no-unused-vars */
import React from 'react'

//Will be hidden with CSS style, be used to correct buggy lines.
const AdminBar = (props) => {

  //Change display to '' to be be eligible to correct the buggyLines
  const style = {
    display: '' ,
    border: 'solid',
    borderWidth: 1,
  }

  /*
  <span>{props.adminMessage}</span>
  <br></br>
  Query bugId:
  <input value={props.queryBugId} type='text' onChange={props.handleQueryBugIdChange}></input>
  <button onClick={props.handleCorrect}>correct</button>
  <span>{props.adminMessage}</span>
  */

  return (
    <div style={style}>
        admin bar, correct buggy lines!
      <br></br>
        OBS! dont forget to enable the correct put route and disable the other one in backend!
      <br></br>
        Search by videoId, once found search by bugId, once found remove it
      <form onSubmit = {props.searchVideoById}>
        Query videoId:
        <input value={props.queryVideoId} type='text' onChange={props.handleQueryVideoIdChange}></input>
        <button type='submit'>search by id</button>
      </form>
      <span>{props.adminMessage1}</span>
      <br></br>
      <form onSubmit={props.searchBugById}>
        Query bugId:
        <input value={props.queryBugId} type='text' onChange={props.handleQueryBugIdChange}></input>
        <button type='submit'>search bug</button>
      </form>
      <span>{props.adminMessage2}</span>
      <br></br>
      <button onClick={props.handleCorrect}>remove the buggy part</button>
      <br></br>
      <span>{props.adminMessage3}</span>
    </div>
  )
}

export default AdminBar
