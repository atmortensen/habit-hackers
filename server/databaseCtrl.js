const Habit = require('./mongoConnect.js')
const sendInvite = require('./nodeMailer.js')
exports = module.exports = {}

exports.create = function(req, res){

	Habit.create({
		title: req.body.habit.title,
	  description: req.body.habit.description,
	  startDate: req.body.habit.startDate,
	  endDate: req.body.habit.endDate,
	  invited: req.body.habit.teamEmails,
	  reward: req.body.habit.reward,
	  owner: req.user.sub,
	  team: [{
		  name: req.user.name,
		  email: req.user.email,
		  id: req.user.sub,
		  calendar: []
	  }]
	}, function(err, habit){
		err ? console.log(err) : null
		sendInvite(req.user, req.body.habit.teamEmails, habit._id)
		res.status(200).json({message: 'Done'})
	})
}

exports.findAll = function(req, res){
	Habit.find({team: {$elemMatch: {id: req.user.sub}}}, function(err, habits){
		err ? console.log(err) : null
		res.status(200).json({habits})
	})
}

exports.findOne = function(req, res){
	Habit.findById(req.params.id, function(err, habit){
		err ? console.log(err) : null
		if(habit.invited.indexOf(req.user.email)!==-1){
			res.status(200).json({habit})
		} else {
			res.status(200).json({error: 'No invite found.'})
		}	
	})
}

exports.remove = function(req, res){
	Habit.find({$and: [{_id: req.params.id}, {owner: req.user.sub}]}).remove(function(err){
		err ? console.log(err) : null
		res.status(200).json({message: 'Done'})
	})
}

// exports.update = function(req, res){
// 	Habit.findById(req.params.id, function(err, habit){
// 		if(err){ console.log(err) }
// 		else{	habit.save(err => console.log(err)) }
// 	})
// }

