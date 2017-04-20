const nodemailer = require('nodemailer')
require('dotenv').config()


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.NODE_MAILER_USER, 
        pass: process.env.NODE_MAILER_PASS 
    }
})

module.exports = transporter


 //  let mailOptions = {
 //      from: '"Fred Foo 👻" <habithackers.invite@gmail.com>', // sender address
 //      to: 'alextmortensen@gmail.com',
 //      replyTo: 'alextmortensen@gmail.com', // list of receivers
 //      subject: 'Hey', // Subject line
 //      text: 'This is a test.' //, // plaintext body
 //      // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
 //  }
	// transporter.sendMail(mailOptions, (error, info) => {
	//   if (error) {
	//     return console.log(error)
	//   }
	//   res.json(info)
	// })
