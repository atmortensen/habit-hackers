import React, {Component} from 'react'
import auth from '../helpers/auth0'

export default class Home extends Component {
  render() {
    return !auth.loggedIn() ? <p>Not logged in!</p> : (
      <div>
        <h1>Home</h1>
        <button onClick={auth.logout}>Logout</button>
      </div>
    )
  }
}
