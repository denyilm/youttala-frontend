/* eslint-disable no-unused-vars */
import React from 'react'

const Header = (props) => {
  return (
    <div className="main-header">
      <a onClick={props.logo} className="brand-logo">
        <div className="brand-logo-name">youttala</div>
      </a>
      <div className="main-nav">
        <ul>
          <li><a className='header-button' onClick={props.home}>home</a></li>
          <li><a className='header-button' onClick={props.about}>about</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Header