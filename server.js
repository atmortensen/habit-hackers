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
app.delete('/api/habits/:id', authenticate, databaseCtrl.remove)

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/build/index.html') 
})

app.listen(app.get('port'), function(){
  console.log('Listening on port ' + app.get('port'))
})