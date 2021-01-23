/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

const Progress = ({ done, timeout }) => {
  const [style, setStyle] = useState({})

  useEffect(() => {
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${done}%`,
      }
      setStyle(newStyle)
    }, timeout)
  }, [])


  //{done}%
  return (
    <div className="progress">
      <div className="progress-done" style={style}>
      </div>
    </div>
  )
}

export default Progress