import React, {Component} from 'react'
import HabitForm from './habitForm'
import * as endpoints from '../../../helpers/endpoints'
import $ from 'jquery'
import moment from 'moment'
import { default as swal } from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export default class NewHabitFormWrapper extends Component {
	constructor(props){
		super(props)

		if(this.props.habit){
			this.originalState = {
				head: 'Edit habit tracker...',
				title: this.props.habit.title,
				description: this.props.habit.description,
				startDate: moment(this.props.habit.startDate),
				endDate: this.props.habit.endDate ? moment(this.props.habit.endDate) : '',
				teamEmails: ['', ''],
				teamEmailsCount: 2,
				reward: this.props.habit.reward,
				noEnd: this.props.habit.endDate==='',
				owner: this.props.habit.owner,
				team: this.props.habit.team,
				id: this.props.habit._id
			}
		} else {
			this.originalState = {
				head: 'Start tracking a new habit...',
				title: '',
				description: '',
				startDate: '',
				endDate: '',
				teamEmails: ['', '', ''],
				teamEmailsCount: 3,
				reward: '',
				noEnd: false
			}
		}

		this.state = this.originalState
	}

	componentDidMount(){
		$('textarea').each(function () {
			this.style.height = 'auto'
		  this.style.height = (this.scrollHeight) + 'px'
		}).on('input', function () {
		  this.style.height = 'auto'
		  this.style.height = (this.scrollHeight) + 'px'
		})

		$('.react-datepicker__input-container input').attr('readonly', 'true')
	}

	reset(showConfirm){
		const reset = (function(){
	    this.setState(this.originalState)
	    this.setState({teamEmails: ['', '', '']})
			$('textarea').each(function () {
			  	this.style.height = 'auto'
			    this.style.height = (this.scrollHeight) + 'px'
			})
		}).bind(this)
		if(showConfirm){
			swal({
				title: 'Are you sure?',
			  text: 'You will lose all changes!',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Yes'
			}).then(function () {
				reset()
			}).catch(swal.noop)
		} else {
			reset()
		}
	}

	titleHandler(e){
    this.setState({ title: e.target.value })
  }

  descriptionHandler(e){
    this.setState({ description: e.target.value })
  }

  rewardHandler(e){
    this.setState({ reward: e.target.value })
  }

  teamEmailsHandler(index, e){
  	let teamEmails = this.state.teamEmails
  	teamEmails[index] = e.target.value
  	this.setState({ teamEmails: teamEmails })
  }

  addEmailField(){
  	let teamEmails = this.state.teamEmails
  	teamEmails.push('')
  	this.setState({ 
  		teamEmails: teamEmails,
  		teamEmailsCount: this.state.teamEmailsCount+1 
  	})
  }

  startDateHandler(e){
  	this.setState({ startDate: e })
  }

  endDateHandler(e){
  	this.setState({ endDate: e })
  }

  submit(){
  	if(!this.state.title){
  		swal('Oops...', '"Habit Title" is a required field.', 'warning')
  		return
  	}
  	if(!this.state.startDate || (!this.state.endDate && !this.state.noEnd)){
  		swal('Oops...', 'Date fields are required.', 'warning')
  		return
  	}
  	this.props.clearHabits()
  	if(this.state.owner){
  		endpoints.updateHabit(this.state).then(()=>{
  			this.props.updateHabits('Habit tracker updated successfully!')
  		})
  	} else {
  		endpoints.createHabit(this.state).then(()=>{
  			this.props.updateHabits('New habit tracker created successfully!')
  		})
  	}
  	this.reset()
  	this.props.hide()
  }

  noEndHandler(e){
  	this.setState({
  		noEnd: e.target.checked,
  		endDate: ''
  		})
  }

  ownerChangeHandler(e){
  	let newOwner = this.state.team.find(person=> person.id===e.target.value)
  	this.setState({ owner: newOwner })
  }

	render(){
		return (
			<HabitForm
				titleHandler={this.titleHandler.bind(this)}
				title={this.state.title}
				head={this.state.head}
				description={this.state.description}
				descriptionHandler={this.descriptionHandler.bind(this)}
				addEmailField={this.addEmailField.bind(this)}
				teamEmails={this.state.teamEmails}
				teamEmailsCount={this.state.teamEmailsCount}
				teamEmailsHandler={this.teamEmailsHandler.bind(this)}
				reward={this.state.reward}
				rewardHandler={this.rewardHandler.bind(this)}
				reset={this.reset.bind(this)}
				startDate={this.state.startDate}
				startDateHandler={this.startDateHandler.bind(this)}
				endDate={this.state.endDate}
				endDateHandler={this.endDateHandler.bind(this)}
				submit={this.submit.bind(this)}
				noEndHandler={this.noEndHandler.bind(this)}
				noEnd={this.state.noEnd}
				team={this.state.team} 
				owner={this.state.owner}
				ownerChangeHandler={this.ownerChangeHandler.bind(this)} />
		)
	}
}