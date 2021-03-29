/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import Type from './Type'
import TypeAlone from './TypeAlone'
import { FaCircle } from 'react-icons/fa'
import { FaRegCircle } from 'react-icons/fa'
import { FaCreativeCommons, FaCreativeCommonsBy } from 'react-icons/fa'
import Bojningar from './Bojningar'
import { GrArchive, GrClone, GrDocument, GrPin } from 'react-icons/gr'

const Lexicon = (props) => {

  let meaningIndexes = []
  //console.log(props)

  for(let i = 0 ; i < props.length_arr ; i++){
    meaningIndexes.push(i)
  }

  let finnsBojningar = Object.keys(props.meaning).includes('bojningar')

  return (
    <div id='lex-container'>
      <div id='lex-types-container'>
        {props.types.length > 1 ?
          props.types.map( (type, i=0) =>
            <Type
              key={type.type + i+1}
              pickId={type.type}
              pick={props.pickMe}
              type={type.type === '' ? 'empty' : type.type}
              n={type.n}
              globalType={props.pickedType}/>
          ):
          <TypeAlone
            type={props.types[0].type === '' ? 'empty' : props.types[0].type}
            n={props.types[0].n}
          />}
      </div>
      <div id='lex-header-container'>
        <span
          style={{ display: 'inline-flex', alignItems: 'center' }}>
          <ReactCountryFlag countryCode="SE" svg id='swe-flag-icon'/> &nbsp;{props.meaning.word}
        </span>
        <div id='lex-circles-container'>
          {
            meaningIndexes.length > 1 ?
              meaningIndexes.map(index =>
                <span key={index}>
                  {props.index === Number(index) ?
                    <span className='lex-circle' ><FaCircle  color='lightgray' size='9px'/></span> :
                    <span className='lex-circle' onClick={props.pickMeaning} id={index}><FaRegCircle  color='lightgray' id={index} size='9px'/></span>}
                </span>
              ) :
              <span></span>
          }
        </div>
      </div>
      <div id='lex-meaning-container'>
        <Bojningar
          finns={finnsBojningar}
          bojningar={finnsBojningar ? props.meaning.bojningar : ''}
          pickBojning={props.pickBojning}/>
        <span
          style={{ display: 'inline-flex', alignItems: 'center' }}>
          <ReactCountryFlag countryCode="GB" svg/> &nbsp;{Object.keys(props.meaning).includes('engelska')
            ? props.meaning.engelska.join(', ')
            : ''} </span>
        <br></br>
        {Object.keys(props.meaning).includes('definition') && props.meaning.definition !== ''
          ? <div id='lex-definition-container' title={`the definition of '${props.meaning.word}'`}><GrPin id='lex-pin-icon'/><span id='lex-definition-span'>{props.meaning.definition}</span><br/></div>
          : null}
        {Object.keys(props.meaning).includes('synonymer') && props.meaning.synonymer.length > 0
          ? <div id='lex-synonyms-container' title={`synonyms of '${props.meaning.word}'`}><GrClone id='lex-clone-icon'/><span id='lex-synonyms-span'>{props.meaning.synonymer.join(', ')}</span></div>
          : null}
      </div>
      <div id='lex-license-container'>
        <a className='lex-content-owner-name' title="Visit The People's Dictionary, the content owner's website" href='http://folkets-lexikon.csc.kth.se/folkets/folkets.en.html' target='_blank' rel="noreferrer">The People's Dictionary</a>
        <div id='lex-license-icons'>
          <a className='lex-creative-commons' title='Visit Creative Commons to access the license' href='https://creativecommons.org/licenses/by/2.0/' target='_blank' rel="noreferrer"><FaCreativeCommons size='14px'/></a>
          <a className='lex-content-owner' title="Visit The People's Dictionary, the content owner's website" href='http://folkets-lexikon.csc.kth.se/folkets/folkets.en.html' target='_blank' rel="noreferrer"><FaCreativeCommonsBy size='14px'/></a>
        </div>
      </div>
    </div>
  )
}

export default Lexicon
