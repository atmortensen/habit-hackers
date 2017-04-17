import axios from './axios'

export function createHabit(habit){
	return axios().post('api/habits/', {habit})
	.then(function (response) {
		return response.data
	})
}

export function findHabits(){
	return axios().get('api/habits/')
	.then(function (response) {
		return response.data
	})
}

