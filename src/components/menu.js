import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import auth from '../helpers/auth0'
import '../css/menu.css'

function LoginLogout(){
  return auth.loggedIn() ? 
    <Link to="#" onClick={auth.logout}><li className="login-logout">Logout</li></Link> :
    <Link to="#" onClick={auth.login}><li className="login-logout">Login</li></Link>
}

export default class Layout extends Component {
  render() {
    return (
      <div className="menu-container">
        <ul className="menu container">
          <Link to="/" className="logo"><li>Habit Hackers</li></Link>
          <Link to="/dashboard"><li>Dashboard</li></Link>
          <LoginLogout />
        </ul>
      </div>
    )
  }
}
