import React, {Component} from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

export default class Calendar extends Component {
	constructor(){
		super()

		this.state = {
			selectedDay: new Date(),
		}
	}

	calendarClick(day, { disabled }){
    if (!disabled) {
      this.setState({selectedDay: day})
    }
  }

  goToToday(){
  	this.daypicker.showMonth(new Date())
  }

	render(){
		const start = new Date(this.props.startDate)
		const end = new Date(this.props.endDate)

		return (
			<div>
				<DayPicker 
					ref={el => this.daypicker = el}
					className="calendar"
					disabledDays={[{ before: start }, { after: end }]}
					onDayClick={this.calendarClick.bind(this)}
					fromMonth={start}
					selectedDays={ this.state.selectedDay }
		      toMonth={end} />
	      <a onClick={this.goToToday.bind(this)}>today</a>
      </div>
		)
	}
}
