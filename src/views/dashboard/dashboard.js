import React, {Component} from 'react'
import moment from 'moment'
import jwt from 'jwt-decode'
import auth from '../../helpers/auth0'
import Modal from '../../components/modal'
import RandomQuote from '../../components/randomQuote'
import HabitForm from './habitForm/habitFormWrapper'
import MyHabits from './myHabits/myHabits'
import Invite from './inviteAccept/invite'
import Instructions from './instructions'
import * as endpoints from '../../helpers/endpoints'
import './dashboard.css'
import $ from 'jquery'

export default class Dashboard extends Component {
	constructor(props){
		super(props)

		this.state = {
			timeOfDay: '',
			displayModal: false,
			formStarted: false,
			habits: null,
			flashMessage: null,
			inviteId: this.props.match.params.id || localStorage.getItem('inviteId') || '',
			showInviteModal: true,
			displayInstructions: false
		}
	}

	componentDidMount(){
		let now = moment()
		if(now.isBetween(moment('12:00am', 'hh:mma'), moment('12:00pm', 'hh:mma')))
			this.setState({timeOfDay: 'morning'})
		else if(now.isBetween(moment('12:00pm', 'hh:mma'), moment('06:00pm', 'hh:mma')))
			this.setState({timeOfDay: 'afternoon'})
		else this.setState({timeOfDay: 'evening'})

		endpoints.findHabits().then((response)=>{
			this.setState({habits: response.habits})
			this.addDropdowns()
		})
	}

	addDropdowns(){
		$('.dropit').parent().on('click', function(){
			let dropdown = $(this).parent().find('.dropdown')
			if(dropdown.css('display')==='none'){
				$('.dropdown').slideUp(400)
				dropdown.slideDown(400)
			}
		})
	}

	showModal(){ this.setState({displayModal: true}) }
	hideModal(){ this.setState({displayModal: false}) }

	showInstructions(){ 
		this.setState({displayInstructions: true}, ()=>{
			document.body.style.overflow = 'hidden'
		})
	}
	hideInstructions(){ this.setState({displayInstructions: false}) }

	closeInvite(){
		this.setState({showInviteModal: false})
		this.props.history.push('/dashboard')
	}

	clearHabits(){
		this.setState({habits: null})
	}

	updateHabits(message){
		return endpoints.findHabits().then((response)=>{
			this.setState({habits: response.habits})
			this.setState({flashMessage: message})
			$('.dropit').parent().off('click')
			this.addDropdowns()
		})
	}

  render() {
    if(!auth.loggedIn()){
    	localStorage.setItem('inviteId', this.state.inviteId)
    	auth.login()
    	return null
    } else { 
    	return (
	      <div className="container dashboard">
	        <RandomQuote />
	        <div className="flex">
		        <h3>Good {this.state.timeOfDay}, {jwt(localStorage.getItem('id_token')).name.split(' ')[0]}!</h3>
		        <div className="topButtons">
			        <button 
			        	onClick={this.showInstructions.bind(this)}>
			        	How to use.
			        </button>
			        <button 
				        className="green"
			        	onClick={this.showModal.bind(this)}>
			        	Start tracking a new habit.
			        </button>
		        </div>
	        </div>
	        {!!this.state.flashMessage &&
						<p className="flashMessage">{this.state.flashMessage}</p>
	        }

					<MyHabits 
						habits={this.state.habits}
						updateHabits={this.updateHabits.bind(this)}
						clearHabits={this.clearHabits.bind(this)}  />

					<div className="footer">
	        	Created by <a 
	        		target="_blank"
	        		href="http://www.linkedin.com/in/alexander-mortensen">
	        		Alexander Mortensen
	        	</a>
	        </div>

	        {!!this.state.inviteId &&
	        	<Modal
		        	noClose="true"
	        		display={this.state.showInviteModal}>
	        		<Invite 
		        		updateHabits={this.updateHabits.bind(this)}
		        		clearHabits={this.clearHabits.bind(this)}
	        			id={this.state.inviteId}
	        			closeFn={this.closeInvite.bind(this)} />  
	        	</Modal>
	        }

	        <Modal 
	        	hideFn={this.hideInstructions.bind(this)} 
	        	display={this.state.displayInstructions}>
	        	<Instructions />
	        </Modal>
	        
	        <Modal 
	        	hideFn={this.hideModal.bind(this)} 
	        	display={this.state.displayModal}>
	        	<HabitForm 
		        	hide={this.hideModal.bind(this)}
		        	updateHabits={this.updateHabits.bind(this)}
		        	clearHabits={this.clearHabits.bind(this)} />
	        </Modal>
	       
	      </div>
	    )
    }
  }
}
