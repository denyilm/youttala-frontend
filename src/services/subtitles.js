/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import axios from 'axios'
//const baseUrl = 'http://localhost:3001/subtitles'
const baseUrl = '/api/subtitles'
// eslint-disable-next-line linebreak-style
const aboutUrl = '/api/about'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const reportBug = async(subtitleToBeModified) => {
  const url = `${baseUrl}/${subtitleToBeModified.videoId}`
  const response = await axios.put(url, subtitleToBeModified)
  return response.data
}

const deleteBuggyLines = async(subtitleToBeModified) => {
  const url = `${baseUrl}/${subtitleToBeModified.id}`
  const response = await axios.put(url, subtitleToBeModified)
  return response.data
}

export default {
  getAll,
  reportBug,
  deleteBuggyLines
}