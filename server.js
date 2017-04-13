const express = require('express')
const app = express()
const jwt = require('express-jwt')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(cors())
app.use(express.static(__dirname + '/static'))

// mongoose setup 
mongoose.Promise = require('bluebird');
const mlabs = 'mongodb://'+process.env.MLABS_USER+':'+process.env.MLABS_PASS+'@ds161190.mlab.com:61190/habit-hackers'
mongoose.connect(mlabs);

var todoSchema = new mongoose.Schema({
  item: String,
  date: String,
  done: Boolean
});
var Todo = mongoose.model("todo", todoSchema);

Todo({
  item: 'this is a test',
  date: 'today',
  done: false
}).save(err => err ? console.log(err) : null)

// Authentication middleware.
const authenticate = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['HS256']
})

app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." })
})

app.get('/api/private', authenticate, function(req, res) {
  console.log(req.user)
  res.json({ message: "If you can see this, the server knows you're logged in!" })
})

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/static/index.html') 
})

app.listen(3001, function(){
  console.log('Listening on http://localhost:3001')
})
