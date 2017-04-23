import React, {Component} from 'react'
import $ from 'jquery'

export default class Cover extends Component {

  componentDidMount(){
    $('.down').click(()=>{
      $('html, body').animate({
          scrollTop: $('#anchor').offset().top-75
      }, 500)
    })
  }

  render() {
    return (
      <div 
      	className="cover">
      	<div className="coverText">
	      	<h1>Habit Hackers</h1>
	      	<div className="break"></div>
	      	<h2>Work as a team to create good habits or break bad ones.</h2>
      	</div>
        <a href="#" className="down">
          <i className="fa fa-angle-double-down"></i>
        </a>
      </div>
    )
  }
}
