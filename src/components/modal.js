import React, {Component} from 'react'
import '../css/modal.css'

export default class Modal extends Component {
	constructor(props){
		super(props)

		this.state = {
			opacity: props.display
		}
		this.closeModal = this.closeModal.bind(this)
	}

	closeModal(){
		this.setState({opacity: 'none'})
	}

	componentDidMount(){
		const modal = document.querySelector('.modal-wrap')
		if(modal.style.opacity === '0'){
			modal.style.display = 'none'
		}
	}

	render(){
		return (
			<div 
				className="modal-wrap"
				style={{opacity: this.state.opacity}}>
				<div className="modal">
					<div 
						className="close"
						onClick={this.closeModal}>
						X
					</div>
					{this.props.children}
				</div>
			</div>
		)
	}
}

