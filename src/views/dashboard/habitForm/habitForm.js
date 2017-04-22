import React from 'react'
import _ from 'lodash'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.min.css'
import './habitForm.css'

function NewHabitForm(props){

	function emailInputs(){
		let inputList = []
		_.times(props.teamEmailsCount, (index)=>{
			inputList.push(
				<div key={index}>
					<input 
						type="text"
						placeholder="Email"
						onChange={props.teamEmailsHandler.bind(this, index)}
		        value={props.teamEmails[index]} />
        </div>
			)
		})
		return inputList
  }

	return (
		<form className="habitForm">
			<h2>{props.head}</h2>

			<p>Habit Title:</p>
			<div className="section">	
				<input 
					type="text"
					placeholder="e.g. Don't use social media for a month."
					onChange={props.titleHandler}
          value={props.title} />
			</div>

			<p>Description:</p>
			<div className="section">
				<textarea
					type="text"
					placeholder="Add any details about the goal for you and your team to see."
					value={props.description}
					onChange={props.descriptionHandler}>
        </textarea> 
			</div>

			{props.owner && 
				<div>
					<p>Change Team Leader:</p>
					<div className="section">
						<select 
							onChange={props.ownerChangeHandler}
							value={props.owner.id}>
							{props.team.map(person=>{
								return (
									<option 
										value={person.id}
										key={person.id}>
										{person.name}
									</option>
								)
							})}
						</select>
					</div>
				</div>
			}

			<p>Dates:</p>
			<div className="section">
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
				<div className="noEnd">
					<label>No end date&nbsp;</label>
					<input 
						type="checkbox" 
						onChange={props.noEndHandler} 
						checked={props.noEnd} />
				</div>
			</div>

			<p>Invite team members:</p>
			<div className="section">
				{emailInputs()}
				<button 
					type="button"
					onClick={props.addEmailField}>
					+ Team Member
				</button>
			</div>

			<p>Reward/Incentive:</p>
			<div className="section">
				<textarea
					type="text"
					placeholder="Set an optional reward for the team member who is most successful in keeping the goal."
					value={props.reward}
					onChange={props.rewardHandler}>
        </textarea> 
			</div>

			<div>
				<button 
					className="margin-right green"
					type="button"
					onClick={props.submit}>
					Submit
				</button>
				<button 
					type="button"
					onClick={props.reset}>
					Reset
				</button>
			</div>
			
		</form>
	)
}

export default NewHabitForm