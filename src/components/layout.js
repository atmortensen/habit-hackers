import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Layout extends Component {
  render() {
    return (
      <div>
        <h2>Layout</h2>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        {this.props.children}
      </div>
    )
  }
}

