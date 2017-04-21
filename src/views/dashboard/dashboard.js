import React, {Component} from 'react'
import moment from 'moment'
import auth from '../../helpers/auth0'
import Modal from '../../components/modal'
import RandomQuote from '../../components/randomQuote'
import HabitForm from './habitForm/habitFormWrapper'
import MyHabits from './myHabits/myHabits'
import Invite from './inviteAccept/invite'
import Home from '../home/home'
import * as endpoints from '../../helpers/endpoints'
import './dashboard.css'

export default class Dashboard extends Component {
	constructor(props){
		super(props)

		let timeOfDay = moment()
		if(timeOfDay.isBetween(moment('12:00am', 'hh:mma'), moment('12:00pm', 'hh:mma')))
			timeOfDay = 'morning'
		else if(timeOfDay.isBetween(moment('12:00pm', 'hh:mma'), moment('06:00pm', 'hh:mma')))
			timeOfDay = 'afternoon'
		else timeOfDay = 'evening'

		this.state = {
			timeOfDay: timeOfDay,
			displayModal: false,
			formStarted: false,
			habits: null,
			flashMessage: null,
			inviteId: this.props.match.params.id || localStorage.getItem('inviteId'),
			showInviteModal: true
		}
	}

	componentDidMount(){
		endpoints.findHabits().then((response)=>{
			this.setState({habits: response.habits})
		})
	}

	showModal(){
		this.setState({displayModal: true})
	}

	hideModal(){
		this.setState({displayModal: false})
	}

	closeInvite(){
		this.setState({showInviteModal: false})
		this.props.history.push('/dashboard')
	}

	clearHabits(){
		this.setState({habits: null})
	}

	updateHabits(message){
		endpoints.findHabits().then((response)=>{
			this.setState({habits: response.habits})
			this.setState({flashMessage: message})
		})
	}

  render() {
    if(!auth.loggedIn()){
    	auth.login(this.state.inviteId)
    	return <Home />
    } else { 
    	return (
	      <div className="container dashboard">
	        <RandomQuote />
	        <div className="flex">
		        <h3>Good {this.state.timeOfDay}, {auth.getProfile().name.split(' ')[0]}!</h3>
		        <button 
		        	onClick={this.showModal.bind(this)}>
		        	Start tracking a new habit.
		        </button>
	        </div>
	        {!!this.state.flashMessage &&
						<p className="flashMessage">{this.state.flashMessage}</p>
	        }

	        {!!this.state.inviteId &&
	        	<Modal
		        	noClose="true"
	        		display={this.state.showInviteModal}>
	        		<Invite 
		        		updateHabits={this.updateHabits.bind(this)}
	        			id={this.state.inviteId}
	        			closeFn={this.closeInvite.bind(this)} />  
	        	</Modal>
	        }
	        
	        <Modal 
	        	hideFn={this.hideModal.bind(this)} 
	        	display={this.state.displayModal}>
	        	<HabitForm 
		        	hide={this.hideModal.bind(this)}
		        	updateHabits={this.updateHabits.bind(this)}
		        	clearHabits={this.clearHabits.bind(this)} />
	        </Modal>
	        <MyHabits 
	        	habits={this.state.habits}
	        	updateHabits={this.updateHabits.bind(this)}
	        	clearHabits={this.clearHabits.bind(this)}  />
	      </div>
	    )
    }
  }
}
