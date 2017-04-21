const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const authenticate = require('./server/jwtAuth.js')
const databaseCtrl = require('./server/databaseCtrl.js')

if(!process.env.PORT){
	const cors = require('cors')
	app.use(cors())
}

app.set('port', (process.env.PORT || 3001))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/build'))

app.get('/api/habits', authenticate, databaseCtrl.findAll)
app.get('/api/habits/:id', authenticate, databaseCtrl.findOne)
app.post('/api/habits', authenticate, databaseCtrl.create)
app.put('/api/habits/acceptInvite/:id', authenticate, databaseCtrl.acceptInvite)
app.put('/api/habits/leaveHabit/:id', authenticate, databaseCtrl.leaveHabit)
app.put('/api/habits/addSuccess/:id', authenticate, databaseCtrl.addSuccess)
app.delete('/api/habits/removeSuccess/:id', authenticate, databaseCtrl.removeSuccess)

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/build/index.html') 
})

app.listen(app.get('port'), function(){
  console.log('Listening on port ' + app.get('port'))
})