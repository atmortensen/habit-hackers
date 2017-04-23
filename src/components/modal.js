import React, {Component} from 'react'
import '../css/modal.css'

export default class Modal extends Component {
	constructor(props){
		super(props)

		this.state = {
			opacity: 0,
			pointerEvents: 'none',
			marginTop: '-50px'
		}

	}

	closeModal(){
		this.setState({
			opacity: 0, 
			pointerEvents: 'none',
			marginTop: '-50px'
		})
		document.body.style.overflow = 'auto'
	}

	openModal(){
		this.setState({
			opacity: 1, 
			pointerEvents: 'all', 
			marginTop: ''
		})
		document.body.style.overflow = 'hidden'
	}

	componentWillReceiveProps(newProps) {
		if(newProps.display===true){
			this.openModal()
		} else if(newProps.display===false) {
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
					{!this.props.noClose &&
						<div 
							className="close"
							onClick={this.props.hideFn}>
							x
						</div>
					}
					<div className="content">
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
}

