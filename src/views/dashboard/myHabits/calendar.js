import React, {Component} from 'react'
import DayPicker from 'react-day-picker'
import moment from 'moment'
import Loading from '../../../components/loading'
import * as endpoints from '../../../helpers/endpoints'
import { default as swal } from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'react-day-picker/lib/style.css'

export default class Calendar extends Component {
	constructor(){
		super()

		this.state = {
			readyStyle: {
				opacity: 0,
				pointerEvents: 'none'
			}
		}
	}

	calendarClick(day, { disabled }){
		day = moment(day)
    if (!disabled) {
    	if(day.isBefore(moment().add(1, 'd'))){
    		this.setState({readyStyle: {
    			opacity: 1,
    			pointerEvents: 'all'
    		}})
    		if(this.props.successDays.indexOf(day.toISOString())===-1){
    			endpoints.addSuccess(this.props.id, day).then(()=>{
    				this.props.updateHabits().then(()=>{
	    				this.setState({readyStyle: {
			    			opacity: 0,
			    			pointerEvents: 'none'
			    		}})
    				})
    			})
    		} else {
    			endpoints.removeSuccess(this.props.id, day).then(()=>{
    				this.props.updateHabits().then(()=>{
	    				this.setState({readyStyle: {
			    			opacity: 0,
			    			pointerEvents: 'none'
			    		}})
	    			})
    			})
    		}
    	} else {
    		swal({
		  		title: 'You can\'t mark days that haven\'t passed!',
		  	  type: 'warning'
		  	})
    	}
    }
  }

	render(){
		const start = new Date(this.props.startDate)
		const end = new Date(this.props.endDate)
		const modifiers = {
      success: day => this.props.successDays.indexOf(moment(day).toISOString())!==-1
    }

		return (
			<div className="calendar">
				<div 
					style={this.state.readyStyle} 
					className="overlay">
					{this.state.readyStyle.pointerEvents==='all' && <Loading noContainer={true} /> }
				</div>
				
				<DayPicker 
					modifiers={modifiers}
					disabledDays={[{ before: start }, { after: end }]}
					onDayClick={this.calendarClick.bind(this)}
					fromMonth={start}
		      toMonth={new Date(moment(end).subtract(1, 'd'))} />
      </div>
		)
	}
}
