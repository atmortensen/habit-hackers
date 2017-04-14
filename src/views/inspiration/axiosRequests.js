import axios from '../../helpers/axios'

export function getIdeas(){
	return axios.get('api/ideas')
	.then(function (response) {
		return response.data.ideas
	})
}

export function removeIdea(id){
	return axios.delete('api/ideas/' + id)
	.then(function (response) {
		return response.data.ideas
	})
}
