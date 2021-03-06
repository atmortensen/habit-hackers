import Auth0Lock from 'auth0-lock'
import React, {Component} from 'react'
import { isTokenExpired } from './token-helper'
import Loading from '../components/loading'

export class Auth0 extends Component {
  constructor() {
    super()
    // Configure Auth0
    this.lock = new Auth0Lock('7cwpdzgLqT9h0Y5qTCh4GZDOVtGqGu61', 'mortensen.auth0.com', {
      auth: {
        redirectUrl: location.protocol + '//' + location.host + '/auth0',
        responseType: 'token',
        params: {scope: 'openid email name'}
      },
      theme: {
        logo: 'https://storage.googleapis.com/habit-hacker-assets/Logo-Small.png',
        primaryColor: '#000'
      },
      languageDictionary: {
        title: 'Habit Hackers'
      },
      allowedConnections: ['google-oauth2', 'facebook']
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds functions to keep this context
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.loggedIn = this.loggedIn.bind(this)
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken)
    if(this.props) this.props.history.push('/dashboard')
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from local storage
    window.location.replace('/')
    localStorage.removeItem('id_token')
  }

  render(){
    return <Loading />
  }

}

const auth = new Auth0()

export default auth