const mongoose = require('mongoose')
require('dotenv').config()

// mongoose setup 
mongoose.Promise = require('bluebird')
const mlabs = 'mongodb://'+process.env.MLABS_USER+':'+process.env.MLABS_PASS+'@ds161190.mlab.com:61190/habit-hackers'
mongoose.connect(mlabs)

// Schema Setup
const habitSchema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: String,
  endDate: String,
  invited: [String],
  reward: String,
  owner: {
    name: String,
    email: String,
    id: String
  },
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
const Habit = mongoose.model("habit", habitSchema)

module.exports = Habit