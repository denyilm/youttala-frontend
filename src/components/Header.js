/* eslint-disable no-unused-vars */
import React from 'react'

const Header = (props) => {
  /*
  return (
    <div className="main-header">
      <div className="brand-logo">
        <span onClick={props.logo} className="brand-logo-name" title='go to the home page'>youttala</span>
      </div>
      <div className="main-nav">
        <ul>
          <li><a className='header-button' onClick={props.home} title='go to the home page'>home</a></li>
          <li><a className='header-button' onClick={props.about} title='go to the about page'>about</a></li>
        </ul>
      </div>
    </div>
  )
  */

  return (
    <div id='main-header-container'>
      <div id='header-link-container'>
        <span className='header-link' onClick={props.logo}>home</span>
        <span className='header-link' onClick={props.about}>about</span>
      </div>
    </div>
  )
}

export default Header