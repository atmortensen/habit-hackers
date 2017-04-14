// const app = require('../server.js')
const mongoose = require('./mongoConnect.js')
exports = module.exports = {}

var habitIdeaSchema = new mongoose.Schema({
  idea: String,
  likes: Array,
  approved: Boolean
})
var HabitIdea = mongoose.model("habit-idea", habitIdeaSchema)

exports.findAll = function(req, res){
	HabitIdea.find({}, function(err, ideas){
		err ? console.log(err) :
			res.status(200).json({ideas})
	})
}

exports.createNew = function(req, res){
	HabitIdea.create({
		idea: req.body.idea,
		likes: [],
		approved: false
	}, function(err, idea){
		err ? console.log(err) :
			res.status(200).json({idea})
	})
}

exports.remove = function(req, res){
	console.log(req.params.id)
	HabitIdea.find({ _id: req.params.id }).remove(function(err, idea){
		if(err) 
			console.log(err) 
		else {
			HabitIdea.find({}, function(err, ideas){
				err ? console.log(err) :
					res.status(200).json({ideas})
			})
		}
	})
}


