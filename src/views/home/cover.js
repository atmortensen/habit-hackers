import React, {Component} from 'react'
import auth from '../../helpers/auth0'

export default class Cover extends Component {
  render() {
    return (
      <div 
      	className="cover">
      	<div className="coverText">
	      	<h1>Habit Hackers</h1>
	      	<div className="break"></div>
	      	<h2>Work as a team to create good habits or break bad ones.</h2>
          <button onClick={auth.login}>Start Now!</button>
      	</div>
      </div>
    )
  }
}
