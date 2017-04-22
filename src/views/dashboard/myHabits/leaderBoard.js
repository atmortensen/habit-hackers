import React, {Component} from 'react'
import moment from 'moment'

export default class LeaderBoard extends Component {
	constructor(props){
		super(props)

		this.state = {
			totalDays: moment().diff(moment(props.habit.startDate), 'days')+1
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