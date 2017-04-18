const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const authenticate = require('./server/jwtAuth.js')
const databaseCtrl = require('./server/databaseCtrl.js')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + '/static'))

app.get('/api/habits', authenticate, databaseCtrl.findAll)
app.post('/api/habits', authenticate, databaseCtrl.createNew)

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/static/index.html') 
})

app.listen(3001, function(){
  console.log('Listening on http://localhost:3001')
})
