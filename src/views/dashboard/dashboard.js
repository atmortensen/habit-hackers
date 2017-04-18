import React, {Component} from 'react'
import auth from '../../helpers/auth0'
import Modal from '../../components/modal'
import RandomQuote from '../../components/randomQuote'
import HabitForm from './habitForm/habitFormWrapper'
import MyHabits from './myHabits/myHabits'
import * as endpoints from '../../helpers/endpoints'

export default class Dashboard extends Component {
	constructor(){
		super()

		this.state = {
			profile: null,
			displayModal: false,
			formStarted: false,
			habits: null
		}
	}

	componentDidMount(){
		this.setState({profile: auth.getProfile().name})

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

  render() {
    if(!auth.loggedIn()){
    	auth.login()
    } else { 
    	return (
	      <div className="container" >
	        <RandomQuote />
	        <p>{JSON.stringify(this.state.profile)}</p>
	        <button 
	        	onClick={this.showModal.bind(this)}>
	        	Start tracking a new habit.
	        </button>
	        <Modal 
	        	hideFn={this.hideModal.bind(this)} 
	        	display={this.state.displayModal}>
	        	<HabitForm hide={this.hideModal.bind(this)} />
	        </Modal>
	        <MyHabits habits={this.state.habits} />
	      </div>
	    )
    }
  }
}
