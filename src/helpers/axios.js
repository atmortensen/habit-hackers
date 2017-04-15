import axios from 'axios'

let Axios = function(){
	return axios.create({
	  baseURL: 'http://localhost:3001/',
	  headers: {'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
	})
}

export default Axios 