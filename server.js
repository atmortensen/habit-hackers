const express = require('express')
const app = express()
const jwt = require('express-jwt')
const cors = require('cors')
require('dotenv').config()

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_CLIENT_SECRET) {
  throw 'Make sure you have AUTH0_DOMAIN, AUTH0_CLIENT_ID, and AUTH0_CLIENT_SECRET in your .env file'
}

app.use(cors())
app.use(express.static(__dirname + '/static'))

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
