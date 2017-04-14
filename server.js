const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const authenticate = require('./server/jwtAuth.js')
const habitIdeaCtrl = require('./server/habitIdeaCtrl.js')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + '/static'))

// Inspiration/Ideas Endpoints
app.get('/api/ideas', habitIdeaCtrl.findAll)
app.post('/api/ideas', habitIdeaCtrl.createNew)
app.delete('/api/ideas/:id', habitIdeaCtrl.remove)

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

module.exports = app
