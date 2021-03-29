/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import MiniType from './MiniType'
import MiniTypeAlone from './MiniTypeAlone'
import { FaCircle } from 'react-icons/fa'
import { FaRegCircle } from 'react-icons/fa'
import Bojningar from './Bojningar'
import MiniBojningar from './MiniBojningar'
import { FaCreativeCommons, FaCreativeCommonsBy } from 'react-icons/fa'

const MiniLex = (props) => {
  let meaningIndexes = []

  for(let i = 0 ; i < props.length_arr ; i++){
    meaningIndexes.push(i)
  }

  let finnsBojningar = Object.keys(props.meaning).includes('bojningar')
  let miniLexStyle = {
    display: props.lexId === props.pickedWord ? '' : 'none'
  }

  return (
    <div style={miniLexStyle} className='subtitle-mini-box'>
      <div className='mini-lexicon-container'>
        <div id='mini-lex-types-container'>
          {props.types.length > 1 ?
            props.types.map( (type, i=0) =>
              <MiniType
                key={type.type + i+1}
                pickId={type.type}
                pick={props.pickMe}
                type={type.type === '' ? 'empty' : type.type}
                n={type.n}
                globalType={props.pickedType}/>
            ):
            <MiniTypeAlone
              type={props.types[0].type === '' ? 'empty' : props.types[0].type}
              n={props.types[0].n}
            />}
        </div>
        <div id='mini-lex-header-container'>
          <span
            style={{ display: 'inline-flex', alignItems: 'center' }}>
            <ReactCountryFlag countryCode="SE" svg style={{ fontSize: '9px' }} /> &nbsp;{props.meaning.word}
          </span>
          <div id='mini-lex-circles-container'>
            {
              meaningIndexes.length > 1 ?
                meaningIndexes.map(index =>
                  <span key={index}>
                    {props.index === Number(index) ?
                      <span className='lex-circle' ><FaCircle  color='lightgray' size='8px'/></span> :
                      <span className='lex-circle' onClick={props.pickMeaning} id={index}><FaRegCircle  color='lightgray' id={index} size='8px'/></span>}
                  </span>
                ) :
                <span></span>
            }
          </div>
        </div>
        <div id='mini-lex-meaning-container'>
          <MiniBojningar
            finns={finnsBojningar}
            bojningar={finnsBojningar ? props.meaning.bojningar : ''}/>
          <div id='mini-lex-translation-container'>
            <ReactCountryFlag countryCode="GB" svg style={{ fontSize: '9px' }} id='mini-lex-gb-flag-icon'/>
            <span id='mini-lex-definition-span'
              style={{ display: 'inline-flex', alignItems: 'center' }}>
               &nbsp;{Object.keys(props.meaning).includes('engelska')
                ? props.meaning.engelska.join(', ')
                : ''} </span>

          </div>
        </div>
        <div id='mini-lex-license-container'>
          <a className='lex-creative-commons' title='Visit Creative Commons to access the license' href='https://creativecommons.org/licenses/by/2.0/' target='_blank' rel="noreferrer"><FaCreativeCommons size='12px'/></a>
          <a className='lex-content-owner' title="Visit The People's Dictionary, the content owner's website" href='http://folkets-lexikon.csc.kth.se/folkets/folkets.en.html' target='_blank' rel="noreferrer"><FaCreativeCommonsBy size='12px'/></a>
        </div>
      </div>
    </div>
  )
}

export default MiniLex
