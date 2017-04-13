import React, {Component} from 'react'
import auth from '../../helpers/auth0'
import axios from 'axios'

export default class Dashboard extends Component {
	constructor(){
		super()

		this.state = {
			message: null,
			profile: null
		}
	}

	componentDidMount(){
		const _this = this
		_this.setState({profile: auth.getProfile().name})
		

		const config = {
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
		}

		axios.get('http://localhost:3001/api/private', config)
		.then(function (response) {
			_this.setState({message: response.data.message})
		})
		
	}

  render() {
    return !auth.loggedIn() ? <h2>You must loggin to view this page!</h2> : (
      <div>
        <h1>Dashboard</h1>
        <h3>{this.state.message}</h3>
        <p>{JSON.stringify(this.state.profile)}</p>
        <button onClick={auth.logout}>Logout</button>
      </div>
    )
  }
}
