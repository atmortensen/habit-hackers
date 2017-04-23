import React, {Component} from 'react'
import Calendar from './calendar'
import Modal from '../../../components/modal'
import HabitForm from '../habitForm/habitFormWrapper'
import LeaderBoard from './leaderBoard'
import * as endpoints from '../../../helpers/endpoints'
import { default as swal } from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import jwt from 'jwt-decode'

export default class Habit extends Component {
	constructor(){
		super()

		this.state = {
			displayModal: false,
			userId: jwt(localStorage.getItem('id_token')).sub
		}
	}

  hideModal(){
  	this.setState({displayModal: false})
  }

  showModal(){
  	this.setState({displayModal: true})
  }

  leaveTeam(){
  	if(this.state.userId === this.props.habit.owner.id &&
  		this.props.habit.team.length>1){
  		swal({
	  		title: 'Change team leader!',
	  		text: 'Change the team lead before removing, so everyone else won\'t loose their progress.',
	  	  type: 'warning'
	  	})
  	} else {
  		swal({
  			title: 'Are you sure?',
  			text: 'This will permanently remove the habit from your dashboard.',
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
				<h2 className="cardHead">
					{this.props.habit.title} 
					<span  
						className="dropit">
						<i className="fa fa-angle-down"></i>
					</span>
				</h2>
				<div className="dropdown">
					<div className="info">
						<p><strong>Team Leader:</strong> {this.props.habit.owner.name}</p>
						{this.props.habit.description &&
							<p><strong>Description:</strong> {this.props.habit.description}</p>
						}
						{this.props.habit.reward &&
							<p><strong>Reward/Incentive:</strong> {this.props.habit.reward}</p>
						}
					</div>
			
					<div className="dashCal">
						<Calendar
							updateHabits={this.props.updateHabits}
							startDate={this.props.habit.startDate}
							endDate={this.props.habit.endDate}
							successDays={this.props.habit.team.find(person => this.state.userId === person.id).calendar}
							id={this.props.habit._id} />
							
						<LeaderBoard habit={this.props.habit} />
					</div>
					
					<div className="editButtons">
						{this.state.userId === this.props.habit.owner.id &&
							<button
								onClick={this.showModal.bind(this)}>
								Edit
							</button>
						}
						<button
							className="red"
							onClick={this.leaveTeam.bind(this)}>
							Remove
						</button>
					</div>
				</div>

				<Modal 
					hideFn={this.hideModal.bind(this)} 
					display={this.state.displayModal}>
					<HabitForm 
						hide={this.hideModal.bind(this)}
						habit={this.props.habit}
						updateHabits={this.props.updateHabits}
						clearHabits={this.props.clearHabits} />
				</Modal>
			</div>
		)
	}
}