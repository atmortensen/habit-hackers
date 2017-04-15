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

	closeModal(fromProp){
		this.setState({
			opacity: 0, 
			pointerEvents: 'none',
			marginTop: '-50px'
		})
		if(!fromProp)
			this.props.hideModal()
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
			this.closeModal(true)
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
						onClick={this.closeModal}>
						x
					</div>
					{this.props.children}
				</div>
			</div>
		)
	}
}

