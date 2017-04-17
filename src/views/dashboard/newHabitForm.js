import React from 'react'
import _ from 'lodash'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.min.css'
import './newHabitForm.css'

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
			<h2>Start tracking a new habit...</h2>
			<p>
				Habit Title:
				<input 
					type="text"
					placeholder="e.g. Don't use social media for a month. Go to the gym everyday."
					onChange={props.titleHandler}
          value={props.title} />
          A good habit is something trackable. "Be healthier" isn't a good goal because it's not trackable. Instead, you should choose something like "Eat a healthy breakfast everyday".
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
				placeholderText="Start Date"
				todayButton="Today"
				selectsStart
				startDate={props.startDate}
		    endDate={props.endDate}
		    selected={props.startDate}
		    onChange={props.startDateHandler}
			/>
			<DatePicker
				placeholderText="End Date"
				todayButton="Today"
				selectsEnd
				startDate={props.startDate}
				endDate={props.endDate}
		    selected={props.endDate}
		    onChange={props.endDateHandler}
		    disabled={props.noEnd}
			/>
			No end date 
			<input 
				type="checkbox" 
				onChange={props.noEndHandler} 
				checked={props.noEnd} />
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
				onClick={props.submit}>
				Submit
			</button>
			<button 
				type="button"
				onClick={props.reset}>
				Reset
			</button>
			
		</form>
	)
}

export default NewHabitForm