/* eslint-disable no-unused-vars */
import React from 'react'
import { FaMarsDouble } from 'react-icons/fa'

const MiniBojningar = (props) => {

  const style = { display: props.finns ? '' : 'none' }
  const l = props.bojningar.length

  return (
    <div id='mini-lex-bojnings-container' style={style}>
      { props.finns ?
        props.bojningar.map((bojning,i = 0) =>
          <span
            key={i+1}
            id={bojning}
            className='mini-lex-bojning'
            onClick={props.pickBojning}
          >{i === l-1 ? `${bojning}` : `${bojning}, `}</span>) :
        props.bojningar
      }
    </div>
  )
}

export default MiniBojningar