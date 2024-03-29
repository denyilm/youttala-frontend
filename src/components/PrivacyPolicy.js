﻿/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { propTypes } from 'react-country-flag'
import { FaRocket } from 'react-icons/fa'
import Footer from './Footer'
import Header from './Header'

const PrivacyPolicy = (props) => {
  return (
    <div>
      <div id='main-container'>
        <div className='brand-wrapper-in-other-pages'>
          <div id='brand-container' className='just-button' onClick={props.logo}>
            <span id='brand-span'>youttala</span>
          </div>
        </div>
        <div id='privacy-policy-container'>
          <h1 className='title-policy'>Privacy Policy</h1>
          <p><strong>Last updated: </strong>March 24, 2021</p>
          <p>- This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
          <p>- We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href="https://www.privacypolicies.com/privacy-policy-generator/" target="_blank" rel='noreferrer'>Privacy Policy Generator</a>.</p>
          <h1 className='title-policy'>Interpretation and Definitions</h1>
          <h2>Interpretation</h2>
          <p>- The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
          <h2>Definitions</h2>
          <p>- For the purposes of this Privacy Policy:</p>
          <ul>
            <li className='li-policy'>
              <strong>Country</strong> refers to:  Sweden
            </li>
            <li className='li-policy'>
              <strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.
            </li>
            <li className='li-policy'>
              <strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.
            </li>
            <li className='li-policy'>
              <strong>Service</strong> refers to the Website.
            </li>
            <li className='li-policy'>
              <strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of Youttala. It refers to third-party companies or individuals employed by Youttala to facilitate the Service, to provide the Service on behalf of Youttala, to perform services related to the Service or to assist the Company in analyzing how the Service is used.
            </li>
            <li className='li-policy'>
              <strong>Third-party Social Media Service</strong> refers to any website or any social network website through which a User can log in or create an account to use the Service.
            </li>
            <li className='li-policy'>
              <strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
            </li>
            <li className='li-policy'>
              <strong>Website</strong> refers to youttala, accessible from <a href="https://www.youttala.com" target="_blank" rel='noreferrer'>youttala.com</a>
            </li>
            <li className='li-policy'>
              <strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
            </li>
          </ul>
          <h1 className='title-policy'>Collecting and Using Your Data</h1>
          <h2>Types of Data Collected</h2>
          <h3>Usage Data</h3>
          <p>- Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
          <p>- When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
          <p>- We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
          <h3>Tracking Technologies</h3>
          <p>- We use tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</p>
          <ul>
            <li className='li-policy'><strong>Web Beacons.</strong> Certain sections of our Service may contain small electronic files known as web beacons (also referred to as tracking bugs) that permit Youttala, for example, to count users who have visited those pages and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</li>
          </ul>
          <h1 className='title-policy'>Links to Other Websites</h1>
          <p>- Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
          <p>- We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
          <h1 className='title-policy'>YouTube API</h1>
          <p>- This website uses YouTube API to let you watch YouTube videos in an embedded format. Thus, by using this service, You agree to the <a href='https://policies.google.com/privacy'>Google Privacy Policy</a>.</p>
          <h1 className='title-policy'>Changes to this Privacy Policy</h1>
          <p>- We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
          <p>- We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
          <p>- You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
          <h1 className='title-policy'>Contact Us</h1>
          <p>- If you have any questions about this Privacy Policy, You can contact us:</p>
          <ul>
            <li className='li-policy'><strong>info@youttala.com</strong></li>
          </ul>
          <div id='fill-container'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
