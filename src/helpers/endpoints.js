import axios from './axios'

export function createHabit(habit){
	habit.teamEmails = habit.teamEmails.filter(email=>!!email)
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

export function removeHabit(id){
	return axios().delete('api/habits/'+id)
	.then(function (response) {
		return response.data
	})
}

