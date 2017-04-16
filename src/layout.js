import React, {Component} from 'react'
import Menu from './components/menu'
import './css/main.css'

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Menu />
        {this.props.children}
      </div>
    )
  }
}

