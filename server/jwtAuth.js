const jwt = require('express-jwt')
require('dotenv').config()

// Authentication middleware.
const authenticate = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['HS256']
})

module.exports = authenticate