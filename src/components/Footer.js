/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaRegPaperPlane } from 'react-icons/fa'

const Footer = () => {
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
  return (
    <div className="main-footer">
      <span id='copyright'>&#169; 2021, youttala. all rights reserved.</span>
      <span title='contact' id='contact'>info@youttala.com <a id='e-mail-a' href="mailto:info@youttala.com"><FaRegPaperPlane/></a></span>
      <span title='contact' id='contact-small'><a id='e-mail-a' href="mailto:info@youttala.com"><FaRegPaperPlane/></a></span>
    </div>
  )
/*
  return (
    <div>
      <footer>
        <ul>
          <li>license</li>
          <li>e-mail</li>
        </ul>
      </footer>
    </div>
  )
*/
}

export default Footer