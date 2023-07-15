/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import axios from 'axios'
//Enable 1. baseUrl if the frontend is connected to the backend
// Enable 2. for production
//1.
// const baseUrl = 'http://localhost:3002/api'
//2.
const baseUrl = '/api'
// eslint-disable-next-line linebreak-style
//const aboutUrl = '/api/about'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getAbout = () => {
  const url = '/api/about'
  const request = axios.get(url)
  return request.then(response => response.data)
}

const getCollection = (collection) => {
  const url = `${baseUrl}/${collection}`
  const request = axios.get(url)
  return request.then(response => response.data)
}

const getOneSubtitle = async(videoId) => {
  const url = `${baseUrl}/subtitles/${videoId}`
  const response = await axios.get(url)
  return response.data
}

const getSubtitleResults = async(query) => {
  const url = `${baseUrl}/subtitles/results/${query}`
  console.log('First query subtitles')
  const response = await axios.get(url)
  return response.data
}

const getWordResults = async(query) => {
  const url = `${baseUrl}/words/results/${query}`
  console.log('First query words')
  const response = await axios.get(url)
  return response.data
}

const reportBug = async(subtitleToBeModified) => {
  const url = `${baseUrl}/subtitles/${subtitleToBeModified.videoId}`
  const response = await axios.put(url, subtitleToBeModified)
  return response.data
}

const deleteBuggyLines = async(subtitleToBeModified) => {
  const url = `${baseUrl}/subtitles/${subtitleToBeModified.id}`
  const response = await axios.put(url, subtitleToBeModified)
  return response.data
}

export default {
  getAll,
  getAbout,
  getCollection,
  getOneSubtitle,
  getSubtitleResults,
  getWordResults,
  reportBug,
  deleteBuggyLines
}