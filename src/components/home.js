import React, {Component} from 'react'
import auth from '../helpers/auth0'
import axios from 'axios'

export default class Home extends Component {
	constructor(){
		super()

		this.state = {
			message: null,
			profile: null
		}
	}

	componentDidMount(){
		const _this = this

		_this.setState({profile: auth.getProfile()})

		const config = {
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
		}

		axios.get('http://localhost:3001/api/private', config)
		.then(function (response) {
			_this.setState({message: response.data.message})
		})
		.catch(function (error) {
			_this.setState({message: 'Error you are not logged in!'})
		})
		
	}

  render() {
    return !auth.loggedIn() ? <p>Not logged in!</p> : (
      <div>
        <h1>Home</h1>
        <h3>{this.state.message}</h3>
        <p>{JSON.stringify(this.state.profile)}</p>
        <button onClick={auth.logout}>Logout</button>
      </div>
    )
  }
}
