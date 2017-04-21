import React, {Component} from 'react'
import Loading from '../../../components/loading'
import './myHabits.css'
import Calendar from './calendar'
import Modal from '../../../components/modal'
import HabitForm from '../habitForm/habitFormWrapper'
import * as endpoints from '../../../helpers/endpoints'
import { default as swal } from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import jwt from 'jwt-decode'

export default MyHabits

function MyHabits(props) {
	if(!props.habits){
		return <Loading />
	} else if(props.habits.length===0){
		return (
			<div className="myHabits">
				<div className="habit noHabits">
					<h1>You are not tracking any habits!</h1>
					<p>To start tracking a habit you can click on the blue button above this box.</p>
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

class Habit extends Component {
	constructor(){
		super()

		this.state = {
			displayModal: false
		}
	}

  hideModal(){
  	this.setState({displayModal: false})
  }

  showModal(){
  	this.setState({displayModal: true})
  }

  leaveTeam(){
  	if(jwt(localStorage.getItem('id_token')).sub === this.props.habit.owner.id &&
  		this.props.habit.team.length>1){
  		swal({
	  		title: 'Change team leader!',
	  		text: 'Change the team lead before leaving, so everyone else won\'t loose their progress.',
	  	  type: 'warning'
	  	})
  	} else {
  		swal({
  			title: 'Are you sure you want to leave this team?',
  		  type: 'error',
  		  showCancelButton: true,
  		  confirmButtonText: 'Yes'
  		}).then(() => {
  			this.props.clearHabits()
  			endpoints.leaveHabit(this.props.habit._id).then(()=>{
  				this.props.updateHabits('Successfully left team.')
  			})
  		}).catch(swal.noop)
  	}
  }

	render(){
		return (
			<div className="habit">
				<h2>{this.props.habit.title}</h2>
				<p>{this.props.habit.description}</p>
				<p>{this.props.habit.reward}</p>
				<Calendar
					startDate={this.props.habit.startDate}
					endDate={this.props.habit.endDate} />
					
				{this.props.habit.team.map((person, i) => {
					return <li key={i}>{person.name}</li>
				})}
				
				<div className="editButtons">
					{jwt(localStorage.getItem('id_token')).sub === this.props.habit.owner.id &&
						<button
							onClick={this.showModal.bind(this)}>
							Edit
						</button>
					}
					<button
						className="red"
						onClick={this.leaveTeam.bind(this)}>
						Leave Team
					</button>
				</div>

				<Modal 
					hideFn={this.hideModal.bind(this)} 
					display={this.state.displayModal}>
					<HabitForm 
						hide={this.hideModal.bind(this)}
						habit={this.props.habit} />
				</Modal>
			</div>
		)
	}
}
