import React, {Component} from 'react'
import moment from 'moment'

export default class LeaderBoard extends Component {
	constructor(props){
		super(props)

		let endDate = moment().add(1, 'd')
		if(endDate.isAfter(props.habit.endDate))
			endDate = moment(props.habit.endDate)

		this.state = {
			totalDays: endDate.diff(moment(props.habit.startDate), 'days')
		}
	}

	render(){
		return (
			<div className="leaderBoard">
				<h3>Leader Board</h3>
				<ul>
					{this.props.habit.team.sort((a, b)=>{
						return Math.floor(b.calendar.length/this.state.totalDays*100) - Math.floor(a.calendar.length/this.state.totalDays*100)
					}).map((person, i) => {
						let percent = Math.floor(person.calendar.length/this.state.totalDays*100)
						return (
							<li 
								value={percent}
								key={person.id}>
								{i+1}. {person.name} 
								<span className="percent">{percent}%</span>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}