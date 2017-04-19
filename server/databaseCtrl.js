const mongoose = require('./mongoConnect.js')
exports = module.exports = {}

var habitSchema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: String,
  endDate: String,
  invited: [String],
  reward: String,
  owner: String,
  team: [{
	  name: String,
	  email: String,
	  id: String,
	  calendar: [{
	  	day: String,
	  	success: Boolean
	  }]
  }]
})
var Habit = mongoose.model("habit", habitSchema)

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
	}, function(err){
		if(err) 
			console.log(err) 
		else {
			Habit.find({team: {$elemMatch: {id: req.user.sub}}}, function(err, habits){
				err ? console.log(err) :
					res.status(200).json({habits})
			})
		}
	})
}

exports.findAll = function(req, res){
	Habit.find({team: {$elemMatch: {id: req.user.sub}}}, function(err, habits){
		err ? console.log(err) :
			res.status(200).json({habits})
	})
}

exports.remove = function(req, res){
	Habit.find({$and: [{_id: req.params.id}, {owner: req.user.sub}]}).remove(function(err, habits){
		err ? console.log(err) :
			res.status(200).json({habits})
	})
}

exports.update = function(req, res){
	Habit.findById(req.params.id, function(err, habit){
		if(err){ console.log(err) }
		else{	habit.save(err => console.log(err)) }
	})
}



