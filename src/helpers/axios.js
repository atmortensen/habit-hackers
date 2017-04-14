import axios from 'axios'

var Axios = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
})

export default Axios 