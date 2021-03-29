/* eslint-disable no-unused-vars */
import React from 'react'

const Type = (props) => {

  const typeBoxStyle = {
    borderBottom : props.globalType === props.type ? '3px solid lightblue' : '1px solid lightgray',
    //fontWeight: props.globalType === props.type ? 'bold' : 'normal'
  }

  //border-bottom: 1px solid lightgray;
  //'background': props.globalType === props.type ? 'red' : 'orange',

  return (
    <div onClick={props.pick} id={props.pickId} className="lex-type-container" style={typeBoxStyle}>
      <span className='lex-type-span' onClick={props.pick} id={props.pickId}>
        {props.type === 'empty' ? '.    .    .' : props.type}
      </span>
    </div>
  )
}

export default Type