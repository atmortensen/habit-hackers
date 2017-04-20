const mongoose = require('mongoose')
require('dotenv').config()

// mongoose setup 
mongoose.Promise = require('bluebird')
const mlabs = 'mongodb://'+process.env.MLABS_USER+':'+process.env.MLABS_PASS+'@ds161190.mlab.com:61190/habit-hackers'
mongoose.connect(mlabs, (error) => console.log(error))

module.exports = mongoose