const mongoose = require('mongoose')
require('dotenv').config()

// mongoose setup 

console.log(process.env.MLABS_USER)
mongoose.Promise = require('bluebird')
const mlabs = 'mongodb://'+process.env.MLABS_USER+':'+process.env.MLABS_PASS+'@ds161190.mlab.com:61190/habit-hackers'
mongoose.connect(mlabs)

module.exports = mongoose