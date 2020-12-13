import axios from 'axios'
//const baseUrl = '/api/subtitles'
const baseUrl = 'http://localhost:3001/subtitles'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default {
  getAll
}