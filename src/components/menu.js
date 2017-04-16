import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import auth from '../helpers/auth0'
import '../css/menu.css'

function LoginDashboard(){
  return auth.loggedIn() ? 
    <Link to="#" onClick={auth.logout}>Logout</Link> :
    <Link to="#" onClick={auth.login}>Login</Link>
}

export default class Layout extends Component {
  render() {
    return (
      <div className="menu-container">
        <ul className="menu container">
          <li><Link to="/">Habit Hackers</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><LoginDashboard /></li>
        </ul>
      </div>
    )
  }
}
