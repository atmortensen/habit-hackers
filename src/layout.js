import React, {Component} from 'react'
import Menu from './components/menu'
import './css/main.css'

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Menu />
        <div className="spacer"></div>
        {this.props.children}
        <div className="footer">
        	Created by <a 
        		target="_blank"
        		href="http://www.linkedin.com/in/alexander-mortensen">
        		Alexander Mortensen
        	</a>
        </div>
      </div>
    )
  }
}

