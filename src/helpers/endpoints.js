import axios from './axios'

export function createHabit(habit){
	habit.teamEmails = habit.teamEmails.filter(email=>!!email)
	return axios().post('api/habits/', {habit})
	.then(function (response) {
		return response.data
	})
}

export function updateHabit(habit){
	habit.teamEmails = habit.teamEmails.filter(email=>!!email)
	return axios().put('api/habits/' + habit.id, {habit})
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

export function viewInvite(id){
	return axios().get('api/habits/' + id)
	.then(function (response) {
		return response.data
	})
}

export function acceptInvite(id){
	return axios().put('api/habits/acceptInvite/' + id)
	.then(function (response) {
		return response.data
	})
}

export function leaveHabit(id){
	return axios().put('api/habits/leaveHabit/' + id)
	.then(function (response) {
		return response.data
	})
}

export function addSuccess(id, date){
	return axios().put('api/habits/addSuccess/' + id, {date})
	.then(function (response) {
		return response.data
	})
}

export function removeSuccess(id, date){
	return axios().put('api/habits/removeSuccess/' + id, {date})
	.then(function (response) {
		return response.data
	})
}


