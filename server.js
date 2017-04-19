const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// const nodemailer = require('nodemailer')

const authenticate = require('./server/jwtAuth.js')
const databaseCtrl = require('./server/databaseCtrl.js')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + '/static'))

app.get('/api/habits', authenticate, databaseCtrl.findAll)
app.post('/api/habits', authenticate, databaseCtrl.create)
app.delete('/api/habits/:id', authenticate, databaseCtrl.remove)

// app.get('/email', function(req, res){
// 	var transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//           user: '', // Your email id
//           pass: '' // Your password
//       }
//   })
//   let mailOptions = {
//       from: 'habithackers.invite@gmail.com', // sender address
//       to: 'alextmortensen@gmail.com', // list of receivers
//       subject: 'Hey', // Subject line
//       text: 'This is a test.' //, // plaintext body
//       // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
//   }
// 	transporter.sendMail(mailOptions, (error, info) => {
// 	  if (error) {
// 	    return console.log(error)
// 	  }
// 	  console.log('Message %s sent: %s', info.messageId, info.response)
// 	})
// })

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/static/index.html') 
})

app.listen(3001, function(){
  console.log('Listening on http://localhost:3001')
})
