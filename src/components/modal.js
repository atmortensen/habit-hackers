import React, {Component} from 'react'
import '../css/modal.css'

export default class Modal extends Component {
	constructor(){
		super()

		this.state = {
			opacity: 0,
			pointerEvents: 'none',
			marginTop: '-50px'
		}

		this.closeModal = this.closeModal.bind(this)
		this.openModal = this.openModal.bind(this)
	}

	closeModal(){
		this.setState({
			opacity: 0, 
			pointerEvents: 'none',
			marginTop: '-50px'
		})
	}

	openModal(){
		this.setState({
			opacity: 1, 
			pointerEvents: 'all', 
			marginTop: 0
		})
	}

	componentWillReceiveProps(newProps) {
		if(newProps.display){
			this.openModal()
		} else {
			this.closeModal()
		}
	}

	render(){
		return (
			<div 
				className="modal-wrap"
				style={{
					opacity: this.state.opacity, 
					pointerEvents: this.state.pointerEvents
				}}>
				<div 
					className="modal"
					style={{
						marginTop: this.state.marginTop, 
					}}>
					<div 
						className="close"
						onClick={this.props.hideFn}>
						x
					</div>
					<div className="content">
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
}

