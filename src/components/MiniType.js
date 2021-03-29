/* eslint-disable no-unused-vars */
import React from 'react'

const MiniType = (props) => {

  const typeBoxStyle = {
    borderBottom : props.globalType === props.type ? '2px solid lightblue' : '1px solid lightgray',
    fontWeight: props.globalType === props.type ? 'bold' : 'normal'
  }

  //border-bottom: 1px solid lightgray;
  //'background': props.globalType === props.type ? 'red' : 'orange',

  return (
    <div onClick={props.pick} id={props.pickId} className="mini-lex-type-container" style={typeBoxStyle}>
      <span className='mini-lex-type-span' onClick={props.pick} id={props.pickId}>
        {props.type === 'empty' ? '. . .' : props.type}
      </span>
    </div>
  )
}

export default MiniType