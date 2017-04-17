import React from 'react'
import _ from 'lodash'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.min.css'

function NewHabitForm(props){
	function emailInputs(){
		let inputList = []
		_.times(props.teamEmailsCount, (index)=>{
			inputList.push(
				<p key={index}>
					<input 
						type="text"
						placeholder="Email"
						onChange={props.teamEmailsHandler.bind(this, index)}
		        value={props.teamEmails[index]} />
        </p>
			)
		})
		return inputList
  }

	return (
		<form>
			<h2>New Habit</h2>
			<p>
				<input 
					type="text"
					placeholder="Title"
					onChange={props.titleHandler}
          value={props.title} />
			</p>
			<p>
				<textarea
					type="text"
					placeholder="Description"
					value={props.description}
					onChange={props.descriptionHandler}>
        </textarea> 
			</p>
			<DatePicker
					selectsStart
					startDate={props.startDate}
			    endDate={props.endDate}
			    selected={props.startDate}
			    onChange={props.startDateHandler}
			/>
			<DatePicker
					selectsEnd
					startDate={props.startDate}
					endDate={props.endDate}
			    selected={props.endDate}
			    onChange={props.endDateHandler}
			/>
			<p>Invite Team Members</p>
			{emailInputs()}
			<button 
				type="button"
				onClick={props.addEmailField}>
				+Team Member
			</button>
			<p>
				<textarea
					type="text"
					placeholder="Reward/Incentive"
					value={props.reward}
					onChange={props.rewardHandler}>
        </textarea> 
			</p>
			<button 
				type="button"
				onClick={props.reset}>Reset
			</button>
			
		</form>
	)
}

export default NewHabitForm