import React, {Component} from 'react'
import Cover from './cover'
import './home.css'

export default class Home extends Component {
	componentDidMount(){
		localStorage.removeItem('inviteId')
	}

  render() {
    return (
      <div>
        <Cover />
        <div id="anchor"></div>
      </div>
    )
  }
}
