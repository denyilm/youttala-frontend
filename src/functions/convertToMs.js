/* eslint-disable no-unused-vars */
//time : ref.current.getCurrentTime()
const convertToMs = (time) => {
  let digitsAfterDot = time.toString().split('.')[1]
  let time_str = time.toString().split('.').join('')
  let l = time_str.length
  return time_str.substring(0, l-(digitsAfterDot.length-3))
}

export default convertToMs
