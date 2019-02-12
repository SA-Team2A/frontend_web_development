import axios from 'axios'
const port = process.env.REACT_APP_API_PORT || 80
const apiUrl = `http://${process.env.REACT_APP_API_URL}:${port}`


const req = (data) => axios({
  url: '/auth',
  method: 'post',
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' },
  data
})

const auth_req = (data) => axios({
  url: '/',
  method: 'post',
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  data
})

export { req, auth_req }
