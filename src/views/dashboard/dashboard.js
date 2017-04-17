import React, {Component} from 'react'
import auth from '../../helpers/auth0'
import Modal from '../../components/modal'
import RandomQuote from '../../components/randomQuote'
import NewHabitForm from './newHabitFormWrapper'

import axios from '../../helpers/axios'

export default class Dashboard extends Component {
	constructor(){
		super()

		this.state = {
			message: null,
			profile: null,
			displayModal: false,
			formStarted: false
		}
	}

	componentDidMount(){
		const _this = this
		_this.setState({profile: auth.getProfile().name})

		axios().get('http://localhost:3001/api/private')
		.then(function (response) {
			_this.setState({message: response.data.message})
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
	        <h3>{this.state.message}</h3>
	        <p>{JSON.stringify(this.state.profile)}</p>
	        <button 
	        	onClick={this.showModal.bind(this)}>
	        	Start tracking a new habit.
	        </button>
	        <Modal 
	        	hideFn={this.hideModal.bind(this)} 
	        	display={this.state.displayModal}>
	        	<NewHabitForm />
	        </Modal>
	      </div>
	    )
    }
  }
}
