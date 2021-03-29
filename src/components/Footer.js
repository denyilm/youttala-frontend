/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaRegPaperPlane } from 'react-icons/fa'

const Footer = (props) => {
  const [showMail, setShowMail] = useState(false)

  /*
  return (
    <div className="main-footer">
      <nav className="footer-nav">
        <ul>
          <li><a href="#">&#169;2020 youttala.</a></li>
          <li><a href="#">e-mail</a></li>
        </ul>
      </nav>
    </div>
  )
  */

  /*
  return (
    <div id="main-footer-container">
      <span id='privacy-policy-footer' onClick={props.policy} className='footer-button' title='go to the privacy policy page'>privacy policy</span>
      <span id='copyright'>&#169; 2021, youttala. all rights reserved.</span>
      <span title='contact' id='contact'>info@youttala.com <a title='send an e-mail to us' id='e-mail-a' href="mailto:info@youttala.com"><FaRegPaperPlane/></a></span>
      <span title='send an e-mail to us' id='contact-small'><a id='e-mail-a' href="mailto:info@youttala.com"><FaRegPaperPlane/></a></span>
    </div>
  )
  */
  return (
    <div id="main-footer-container">
      <div id='footer-upper-container'>
        <div id='footer-pages-container'>
          <span className='footer-link' onClick={props.about}>about</span>
          <span className='footer-link' onClick={props.policy}>privacy policy</span>
        </div>
        <div id='contact-container'>
          <span><strong>contact:</strong></span>
          <span>info@youttala.com</span>
        </div>
      </div>
      <div id='footer-copyright'>
        <span id='copyright'>&#169; 2021, youttala. all rights reserved.</span>
      </div>
    </div>
  )
}

export default Footer