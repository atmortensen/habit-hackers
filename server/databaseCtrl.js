// const app = require('../server.js')
const mongoose = require('./mongoConnect.js')
exports = module.exports = {}

var habitSchema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: String,
  endDate: String,
  invited: Array,
  reward: String,
  owner: String,
  team: Array
})
var Habit = mongoose.model("habit", habitSchema)

exports.createNew = function(req, res){
	console.log(req.body)
	Habit.create({
		title: req.body.habit.title,
	  description: req.body.habit.description,
	  startDate: req.body.habit.startDate,
	  endDate: req.body.habit.endDate,
	  invited: req.body.habit.teamEmails,
	  reward: req.body.habit.reward,
	  owner: req.user.sub,
	  team: [req.user.sub]
	}, function(err){
		if(err) 
			console.log(err) 
		else {
			Habit.find({}, function(err, habits){
				err ? console.log(err) :
					res.status(200).json({habits})
			})
		}
	})
}

exports.findAll = function(req, res){
	Habit.find({team: req.user.sub}, function(err, habits){
		err ? console.log(err) :
			res.status(200).json({habits})
	})
}


