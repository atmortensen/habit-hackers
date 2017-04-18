import React, {Component} from 'react'
import HabitForm from './habitForm'
import * as endpoints from '../../../helpers/endpoints'
import $ from 'jquery'
import moment from 'moment'

export default class NewHabitFormWrapper extends Component {
	constructor(props){
		super(props)

		let originalState;
		if(this.props.habit){
			originalState = {
				head: 'Edit habit...',
				title: this.props.habit.title,
				description: this.props.habit.description,
				startDate: moment(this.props.habit.startDate),
				endDate: this.props.habit.endDate ? moment(this.props.habit.endDate) : '',
				teamEmails: ['', '', ''].slice(),
				teamEmailsCount: 3,
				reward: this.props.habit.reward,
				noEnd: this.props.habit.endDate===''
			}
		} else {
			originalState = {
				head: 'Start tracking a new habit...',
				title: '',
				description: '',
				startDate: '',
				endDate: '',
				teamEmails: ['', '', ''].slice(),
				teamEmailsCount: 3,
				reward: '',
				noEnd: false
			}
		}

		this.state = originalState

		this.reset = function(){
	  	if(confirm('Are you sure you want to reset and lose unsaved changes?')){
		    this.setState(originalState)
				$('textarea').each(function () {
				  	this.style.height = 'auto'
				    this.style.height = (this.scrollHeight) + 'px'
				})
	  	}
  	}
	}

	componentDidMount(){
		$('textarea').each(function () {
			this.style.height = 'auto'
		  this.style.height = (this.scrollHeight) + 'px'
		}).on('input', function () {
		  this.style.height = 'auto'
		  this.style.height = (this.scrollHeight) + 'px'
		})
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
  	endpoints.createHabit(this.state)
  	this.props.hide()
  }

  noEndHandler(e){
  	this.setState({
  		noEnd: e.target.checked,
  		endDate: ''
  		})
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
				noEnd={this.state.noEnd} />
		)
	}
}