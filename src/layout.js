import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import auth from './helpers/auth0'

function LoginDashboard(){
  return auth.loggedIn() ? 
    <Link to="/dashboard">Dashboard</Link> :
    <Link to="" onClick={auth.login.bind(this)}>Login</Link>
}

export default class Layout extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Habit Hackers</Link></li>
          <li><Link to="/ideas">Ideas</Link></li>
          <li><LoginDashboard /></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
