const Habit = require('./mongoConnect.js')
const email = require('./nodeMailer.js')
exports = module.exports = {}

exports.create = function(req, res){

	let inviteList = req.body.habit.teamEmails.reduce((all, current)=>{
		return all + current + ', '
	}, '')
  let mailOptions = {
      from: 'Habit Hackers Team Invite <habithackers.invite@gmail.com>', 
      to: inviteList,
      replyTo: req.user.email, 
      subject: req.user.name + ' invited you to join his/her team!', 
      html: '<div style="background:#f2f2f2;margin:0;padding:50px"><div style="text-align:center;font-family:sans-serif;padding: 15px;margin: auto;background: #FFF;border:1px solid #ccc;width: 600px;"> <p> <img style="width: 150px" src="https://s3-us-west-2.amazonaws.com/habit-hackers/logoSmall.png"/> </p><h1 style="margin:0">' + req.user.name + '</h1> <h2 style="margin-top:5px">Invited you to join his/her team on Habit Hackers!</h2> <a style="color: inherit; text-decoration: none; padding: 12px 25px; border-radius: 100px; background: #1c6497; font-weight:bold; color: white; display: inline-block; margin: 5px 0;" href="'+  +'" target="_blank"> Accept Invitation </a><h3>Habit Hackers lets you work as a team to create good habits or break bad ones.</h3> </div></div>' 
  }
  if(inviteList.length!==0)
		email.sendMail(mailOptions, (error) => console.log(error))

	Habit.create({
		title: req.body.habit.title,
	  description: req.body.habit.description,
	  startDate: req.body.habit.startDate,
	  endDate: req.body.habit.endDate,
	  invited: req.body.habit.teamEmails,
	  reward: req.body.habit.reward,
	  owner: req.user.sub,
	  team: [{
		  name: req.user.name,
		  email: req.user.email,
		  id: req.user.sub,
		  calendar: []
	  }]
	}, function(err){
		if(err) 
			console.log(err) 
		else {
			Habit.find({team: {$elemMatch: {id: req.user.sub}}}, function(err){
				err ? console.log(err) : null
				res.status(200).json({message: 'Done'})
			})
		}
	})
}

exports.findAll = function(req, res){
	Habit.find({team: {$elemMatch: {id: req.user.sub}}}, function(err, habits){
		err ? console.log(err) : null
		res.status(200).json({habits})
	})
}

exports.findOne = function(req, res){
	Habit.findById(req.params.id, function(err, habit){
		if(err) console.log(err) : null
		if(habit.invited.indexOf(req.user.email)!==-1){
			res.status(200).json({habit})
		} else {
			res.status(200).json({error: 'No invite found.'})
		}	
	})
}

exports.remove = function(req, res){
	Habit.find({$and: [{_id: req.params.id}, {owner: req.user.sub}]}).remove(function(err){
		err ? console.log(err) : null
		res.status(200).json({message: 'Done'})
	})
}

// exports.update = function(req, res){
// 	Habit.findById(req.params.id, function(err, habit){
// 		if(err){ console.log(err) }
// 		else{	habit.save(err => console.log(err)) }
// 	})
// }

