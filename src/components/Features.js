/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaHeadphones } from 'react-icons/fa'
import { FaExclamationCircle, FaAngleDown, FaAngleUp, FaSpinner } from 'react-icons/fa'
import { FaRocket } from 'react-icons/fa'
import { GrCompliance, GrInfo, GrInspect, GrSync, GrTransaction, GrUserPolice } from 'react-icons/gr'

const Features = (props) => {
  return (
    <div id='features-container' style={{ display: props.show ? '' : 'none' }}>
      <span className='feature-heading'><FaRocket id='rocket-icon-feature'/> youttala has new features and updates!</span>
      <br></br>
      <div id='features'>
        <span className='feature'><strong>- Now you can also learn:</strong></span>
        <br></br>
        <span className='feature'><GrTransaction id='translation-icon-feature'/> English translations*</span>
        <br></br>
        <span className='feature'><GrInfo id='info-icon-feature'/> Word classes (ordklasser)*</span>
        <br></br>
        <span className='feature'><GrInspect id='form-icon-feature'/> Forms*</span>
        <br></br>
        <span className='feature'><strong>- Good to know:</strong></span>
        <br></br>
        <span className='feature'><GrSync id='synch-icon-feature'/> Synched subtitles with clickable words</span>
        <br></br>
        <span className='feature'><strong>- Recently published: </strong></span>
        <br></br>
        <span className='feature'><GrCompliance id='policy-icon-feature'/> <a href='/privacypolicy' className='link-in-feature'> Privacy Policy</a></span>
        <br></br>
        <br></br>
        <span id='attribution-text-feature'>*The features were enabled thanks to <a href='http://folkets-lexikon.csc.kth.se/folkets/folkets.en.html' className='link-in-feature' target='_blank' rel="noreferrer" title="Visit The People's Dictionary">The People's Dictionary</a>. The Dictionary data is downloaded and used under <a href='https://creativecommons.org/licenses/by/2.0/' target='_blank' rel="noreferrer" title='Visit Creative Commons to access the license' className='link-in-feature'> the Distributed Creative Commons Attribution-Share Alike 2.5 Generic license.</a></span>
      </div>
    </div>
  )
}

export default Features