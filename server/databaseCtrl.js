const Habit = require('./mongoConnect.js')
const sendInvite = require('./nodeMailer.js')
const moment = require('moment')
exports = module.exports = {}

exports.create = function(req, res){

	Habit.create({
		title: req.body.habit.title,
	  description: req.body.habit.description,
	  startDate: req.body.habit.startDate,
	  endDate: req.body.habit.endDate,
	  invited: req.body.habit.teamEmails,
	  reward: req.body.habit.reward,
	  owner: {
	  	name: req.user.name,
		  email: req.user.email,
		  id: req.user.sub
	  },
	  team: [{
		  name: req.user.name,
		  email: req.user.email,
		  id: req.user.sub,
		  calendar: []
	  }]
	}, function(err, habit){
		err ? console.log(err) : null
		sendInvite(req.user, req.body.habit.teamEmails, habit._id)
	})
	res.status(200).json({message: 'Done'})
}

exports.findAll = function(req, res){
	Habit.find({$query: {'team.id': req.user.sub}, $orderby: {_id: 1}}, function(err, habits){
		err ? console.log(err) : null
		res.status(200).json({habits})
	})
}

exports.findOne = function(req, res){
	Habit.findById(req.params.id, function(err, habit){
		err ? console.log(err) : null
		if(habit && habit.invited.indexOf(req.user.email)!==-1){
			res.status(200).json({habit})
		} else {
			res.status(200).json({error: 'No invite found.'})
		}
	})
}

exports.acceptInvite = function(req, res){
	Habit.findById(req.params.id, function(err, habit){
		err ? console.log(err) : null
		let existingTeamMember = habit.team.filter(person => person.email===req.user.email)
		if(habit && habit.invited.indexOf(req.user.email)!==-1 && existingTeamMember.length===0){
			habit.team.push({
				name: req.user.name,
			  email: req.user.email,
			  id: req.user.sub,
			  calendar: []
			})
			habit.save()
		} 
		res.status(200).json({message: 'done'})	
	})
}

exports.leaveHabit = function(req, res){
	Habit.findById(req.params.id, function(err, habit){
		err ? console.log(err) : null
		habit.team = habit.team.filter(person => person.id!==req.user.sub)
		habit.save()
		res.status(200).json({message: 'done'})	
	})
}

exports.addSuccess = function(req,res){
	Habit.findById(req.params.id, function(err, habit){
		err ? console.log(err) : null

		let foundCalendar = habit.team.find(person => person.id===req.user.sub).calendar

		let isBetween = moment(req.body.date).isAfter(habit.startDate)
		if(habit.endDate)
			isBetween = moment(req.body.date).isBetween(habit.startDate, habit.endDate)
		if(foundCalendar.filter(date => moment(date).isSame(req.body.date, 'day')).length === 0 && isBetween)
			foundCalendar.push(req.body.date)

		habit.save()
		res.status(200).json({message: 'done'})	
	})
}

exports.removeSuccess = function(req,res){
	Habit.findById(req.params.id, function(err, habit){
		err ? console.log(err) : null

		let foundCalendar = habit.team.find(person => person.id===req.user.sub).calendar
		foundCalendar.splice(foundCalendar.indexOf(req.body.date), 1)

		habit.save()
		res.status(200).json({message: 'done'})	
	})
}

exports.update = function(req, res){
	Habit.findById(req.params.id, function(err, habit){
		err ? console.log(err) : null
		if(habit.owner.id===req.user.sub){
			habit.title = req.body.habit.title
			habit.description = req.body.habit.description
			habit.startDate = req.body.habit.startDate
			habit.endDate = req.body.habit.endDate
			habit.reward = req.body.habit.reward
			habit.invited = habit.invited.concat(req.body.habit.teamEmails)
			habit.owner = req.body.habit.owner
			habit.team.forEach(person => {
				person.calendar = person.calendar.filter(date => {
					let isBetween = moment(date).isAfter(req.body.habit.startDate)
					if(req.body.habit.endDate)
						isBetween = moment(date).isBetween(req.body.habit.startDate, req.body.habit.endDate)
					return isBetween
				})
			})
			habit.save()
			sendInvite(req.user, req.body.habit.teamEmails, habit._id)
		}
		res.status(200).json({message: 'done'})	
	})
}

