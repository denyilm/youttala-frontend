import React from 'react'

const MiniTypeAlone = (props) => {

  const typeBoxStyle = {
    borderBottom : '1px solid lightgray'
  }

  //border-bottom: 1px solid lightgray;
  //'background': props.globalType === props.type ? 'red' : 'orange',

  return (
    <div className="mini-lex-type-alone" style={typeBoxStyle}>
      <span className='mini-lex-type-span'>
        {props.type === 'empty' ? '. . .' : props.type}{props.n > 1 ? `(${props.n})` : ''}
      </span>
    </div>
  )
}

export default MiniTypeAlone