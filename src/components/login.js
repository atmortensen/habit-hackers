import React, {Component} from 'react'
import auth from '../helpers/auth0'

export default class Login extends Component {
  render() {
    return auth.loggedIn() ? <h1>Logged In</h1> : (
      <div>
        <h2>Login</h2>
        <button onClick={auth.login.bind(this)}>Login</button>
      </div>
    )
  }
}

