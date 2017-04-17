import React, {Component} from 'react'
import NewHabitForm from './newHabitForm'
import * as endpoints from '../../helpers/endpoints'

export default class NewHabitFormWrapper extends Component {
	constructor(){
		super()

		this.state = {
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

	titleHandler(e){
    this.setState({ title: e.target.value })
  }

  descriptionHandler(e){
    this.setState({ description: e.target.value })
  }

  rewardHandler(e){
    this.setState({ reward: e.target.value })
  }

  reset(){
  	if(confirm('Are you sure you want to reset and lose unsaved changes?')){
	    this.setState({
				title: '',
				description: '',
				startDate: '',
				endDate: '',
				teamEmails: ['', '', ''],
				teamEmailsCount: 3,
				reward: '',
				noEnd: false
			})
  	}
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
			<NewHabitForm
				titleHandler={this.titleHandler.bind(this)}
				title={this.state.title}
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