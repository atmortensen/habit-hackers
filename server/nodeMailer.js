const nodemailer = require('nodemailer')
require('dotenv').config()


const email = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.NODE_MAILER_USER, 
        pass: process.env.NODE_MAILER_PASS 
    }
})

module.exports = email