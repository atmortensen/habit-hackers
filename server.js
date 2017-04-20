const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const cors = require('cors')

// const authenticate = require('./server/jwtAuth.js')
// const databaseCtrl = require('./server/databaseCtrl.js')

app.set('port', (process.env.PORT || 3001))
app.use(bodyParser.json())
// app.use(cors())
// app.use(express.static(__dirname + '/build'))

app.get('/api', function(req, res){
	res.json({message: 'All good'})
})
// app.get('/api/habits', authenticate, databaseCtrl.findAll)
// app.post('/api/habits', authenticate, databaseCtrl.create)
// app.delete('/api/habits/:id', authenticate, databaseCtrl.remove)

// app.get('*', function(req, res) {
//   res.sendFile(__dirname + '/build/index.html') 
// })

app.listen(app.get('port'), function(){
  console.log('Listening on port ' + app.get('port'))
})