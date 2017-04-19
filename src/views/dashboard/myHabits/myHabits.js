import React, {Component} from 'react'
import Loading from '../../../components/loading'
import './myHabits.css'
import Calendar from './calendar'
import Modal from '../../../components/modal'
import HabitForm from '../habitForm/habitFormWrapper'
import auth from '../../../helpers/auth0'
import * as endpoints from '../../../helpers/endpoints'
import { default as swal } from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export default MyHabits

function MyHabits(props) {
	if(!props.habits){
		return <Loading />
	} else {
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

  removeHabit(){
  	swal({
  		title: 'Are you sure you want to delete?',
  	  type: 'error',
  	  showCancelButton: true
  	}).then(() => {
  		this.props.clearHabits()
  		endpoints.removeHabit(this.props.habit._id).then(()=>{
  			this.props.updateHabits('Successfully deleted.')
  		})
  	}).catch(swal.noop)
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
				
				{auth.getProfile().user_id === this.props.habit.owner &&
					<div className="editButtons">
						<button
							onClick={this.showModal.bind(this)}>
							Edit
						</button>
						<button
							className="red"
							onClick={this.removeHabit.bind(this)}>
							Delete
						</button>
					</div>
				}
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
