/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import AppCopy from './AppCopy'
import ComingSoon from './ComingSoon'
import AppCopy1 from './AppCopy1'
import AppCopy2 from './AppCopy2'
import UnderMaintenance from './UnderMaintenance'
import AppCopy3 from './AppCopy3'
import NoSuchPage from './NoSuchPage'

ReactDOM.render(
  <Router>
    <AppCopy3 />
  </Router>
  ,
  document.getElementById('root')
)
