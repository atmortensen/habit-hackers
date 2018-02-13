import React, {Component} from 'react'
import * as endpoints from '../../../helpers/endpoints'
import Loading from '../../../components/loading'
import moment from 'moment'
import { default as swal } from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import './inviteAccept.css'

export default class Invite extends Component {
	constructor(){
		super()

		this.state = {
			habit: null
		}
	}

	componentDidMount(){
		if(this.props.id && this.props.id!=='null'){
			endpoints.viewInvite(this.props.id)
				.then(data=> {
					if(data.habit) {
						this.setState({habit: data.habit}) 
					}	else {
						this.props.closeFn()
						swal('Error.',  'Invite unavailable.')
					}
				})
		}
	}

	declineHandler(){
		swal({
			title: 'Are you sure?',
		  type: 'error',
		  showCancelButton: true,
		  confirmButtonText: 'Yes'
		}).then(() => {
			this.props.closeFn()
		}).catch(swal.noop)
	}

	acceptHandler(){
		this.props.closeFn()
		this.props.clearHabits()
		endpoints.acceptInvite(this.state.habit._id).then(()=>{
			this.props.updateHabits('Successfully joined a team!')
		})
	}

	render(){
		if(!this.state.habit) {
			return <Loading noContainer={true} />
		}
		return (
			<div className="inviteAccept">
				<div className="head">
					<img alt="Logo" src="https://storage.googleapis.com/habit-hacker-assets/Logo-Small.png" />
					<h1>{this.state.habit.owner.name}</h1>
					<h2>Invited you to join his/her team!</h2>
				</div>
				<div className="card">
					<p><strong>Habit Title:</strong> {this.state.habit.title}</p>
					{this.state.habit.description && 
						<p><strong>Description:</strong> {this.state.habit.description}</p>
					}
					{this.state.habit.reward &&
						<p><strong>Reward:</strong> {this.state.habit.reward}</p>
					}
					<p><strong>Start Date:</strong> {moment(this.state.habit.startDate).format('MM/DD/YYYY')}</p>
					{this.state.habit.endDate &&
						<p><strong>End Date:</strong> {moment(this.state.habit.endDate).format('MM/DD/YYYY')}</p>
					}
				</div>
				<div className="buttons">
					<button 
						onClick={this.acceptHandler.bind(this)}>
						Accept Invitation
					</button>
					<button 
						onClick={this.declineHandler.bind(this)} 
						className='red'>
						Decline Invitation
					</button>
				</div>
			</div>
		)
	}
}
