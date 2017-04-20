const nodemailer = require('nodemailer')
require('dotenv').config()

function sendInvite(user, emails, id){
	const email = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NODE_MAILER_USER, 
      pass: process.env.NODE_MAILER_PASS 
    }
	})

	let inviteList = emails.reduce((all, current)=>{
		return all + current + ', '
	}, '')

  let mailOptions = {
      from: 'Habit Hackers Team Invite <habithackers.invite@gmail.com>', 
      to: inviteList,
      replyTo: user.email, 
      subject: user.name + ' invited you to join his/her team!', 
      html: '<div style="background:#f2f2f2;color:#000;margin:0;padding:50px"><div style="text-align:center;font-family:sans-serif;padding: 15px;margin: auto;background: #FFF;border:1px solid #ccc;width: 600px;"> <p> <img style="width: 150px" src="https://s3-us-west-2.amazonaws.com/habit-hackers/logoSmall.png"/> </p><h1 style="margin:0">' + user.name + '</h1> <h2 style="margin-top:5px">Invited you to join his/her team on Habit Hackers!</h2> <a style="color: inherit; text-decoration: none; padding: 12px 25px; border-radius: 100px; background: #1c6497; font-weight:bold; color: white; display: inline-block; margin: 5px 0;" href="http://www.habithackers.net/dashboard/'+ id +'" target="_blank"> Accept Invitation </a><h3>Habit Hackers lets you work as a team to create good habits or break bad ones.</h3> </div></div>' 
  }

  if(inviteList)
		email.sendMail(mailOptions)
}

module.exports = sendInvite