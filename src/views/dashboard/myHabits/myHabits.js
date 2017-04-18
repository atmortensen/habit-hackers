import React, {Component} from 'react'
import Loading from '../../../components/loading'
import './myHabits.css'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import Modal from '../../../components/modal'
import HabitForm from '../habitForm/habitFormWrapper'


export default MyHabits

function MyHabits(props) {
	if(!props.habits){
		return <Loading />
	} else {
		return (
			<div 
				className='myHabits'>
				{props.habits.map( (habit) => {
					return <Habit key={habit._id} habit={habit} /> 
				})}
			</div>
		)
	}
}

class Habit extends Component {
	constructor(){
		super()

		this.state = {
			selectedDay: new Date(),
			displayModal: false
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

  hideModal(){
  	this.setState({displayModal: false})
  }

  showModal(){
  	this.setState({displayModal: true})
  }

	render(){
		console.log(this.props.habit)
		const start = new Date(this.props.habit.startDate)
		const end = new Date(this.props.habit.endDate)
		return (
			<div className="habit">
				<h2>{this.props.habit.title}</h2>
				<p>{this.props.habit.description}</p>
				<p>{this.props.habit.reward}</p>
				<DayPicker 
					ref={el => this.daypicker = el}
					className="calendar"
					disabledDays={[{ before: start }, { after: end }]}
					onDayClick={this.calendarClick.bind(this)}
					fromMonth={start}
					selectedDays={ this.state.selectedDay }
		      toMonth={end} />
	      <a onClick={this.goToToday.bind(this)}>today</a>
				
				<button
					onClick={this.showModal.bind(this)}>Edit</button>
				<Modal 
					hideFn={this.hideModal.bind(this)} 
					display={this.state.displayModal}>
					<HabitForm 
						hide={this.hideModal.bind(this)}
						habit={this.props.habit} />
				</Modal>
			</div>
		)
	}
}
