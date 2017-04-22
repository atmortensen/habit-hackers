import React from 'react'
import Loading from '../../../components/loading'
import './myHabits.css'
import Habit from './habit'

export default MyHabits

function MyHabits(props) {
	if(!props.habits){
		return <Loading />
	} else if(props.habits.length===0){
		return (
			<div className="myHabits">
				<div className="habit noHabits">
					<h1>You are not tracking any habits!</h1>
					<p>To start tracking a habit you can click on the green button above this box.</p>
					<p>Pro tip: "Be more healthy" wouldn't be a very good goal, because it isn't very trackable or specific. Instead, you should choose something like "eat a healthy breakfast."</p>
					<p>Good Luck!</p>
				</div>
			</div>
		)
	}	else {
		return (
			<div 
				className='myHabits'>
				{props.habits.map( (habit) => {
					return (
						<Habit 
							key={habit._id} 
							habit={habit} 
							clearHabits={props.clearHabits} 
							updateHabits={props.updateHabits} /> 
					)
				})}
			</div>
		)
	}
}


