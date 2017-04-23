import React from 'react'

export default Instructions

function Instructions(){
	return (
		<div className="instructions">
			<h2>How to use...</h2>
			<p>
				<strong>Creating a new habit tracker:</strong><br />
				Click the green button on the dashboard to start tracking a habit. You can then invite team members and enter details about your habit before click "Submit". 
			</p>
			<p>
				<strong>Inviting team members:</strong><br />
				Working as a team to create or break a habit can help you stay accountable to eachother. You can add team members' emails when you create the habit, and you can add more team member at any time after creating the habit by clicking the "Edit" button under each habit. 
			</p>
			<p>
				<strong>Accepting an invitation:</strong><br />
				Each team member will be sent an email with a link they can follow to join your team.
			</p>
			<p>
				<strong>Editing a habit:</strong><br />
				Team leaders are the only ones who can edit habits. If you are the team leader you should see an "Edit" button under the habit. Clicking on edit will allow you to change habit details, invite new team members and change the team leader to another team member.
			</p>
			<p>
				<strong>Tracking a habit:</strong><br />
				You can start tracking a habit by clicking on it in the dashboard. You can then click on the calendar to mark the days you were successful in keeping your habit. You can also see how eveyone else is doing on the leaderboard. 
			</p>

			<p><strong>Tips:</strong></p>		
			<ul>
				<li>Choose something specific and trackable.</li>
				<li>Start small.</li>
				<li>Replace bad habits with good habits.</li>
				<li>Commit to at least 30 days.</li>
				<li>Don't try to focus on too many habits at a time.</li>
			</ul>

		</div>
	)
}