import React from 'react'

const TypeAlone = (props) => {

  const typeBoxStyle = {
    borderBottom : '1px solid lightgray'
  }

  //border-bottom: 1px solid lightgray;
  //'background': props.globalType === props.type ? 'red' : 'orange',

  return (
    <div className="lex-type-alone" style={typeBoxStyle}>
      <span className='lex-type-span'>
        {props.type === 'empty' ? '.    .    .' : props.type}
      </span>
    </div>
  )
}

export default TypeAlone