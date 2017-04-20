import axios from 'axios'

let baseURL = '/'
if(process.env.NODE_ENV==='development'){
	baseURL = 'http://localhost:3001/'
}

let Axios = function(){
	return axios.create({
	  baseURL: baseURL,
	  headers: {'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
	})
}

export default Axios 