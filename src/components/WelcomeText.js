/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaHeadphones } from 'react-icons/fa'
import { FaExclamationCircle, FaAngleDown, FaAngleUp, FaSpinner } from 'react-icons/fa'

const WelcomeText = (props) => {
  return (
    <div id='welcome-text-container' style={{ display: props.show ? '' : 'none' }}>
        Type a Swedish word and search to learn how it is pronounced and used in the context by watching YouTube!
    </div>
  )
}

export default WelcomeText