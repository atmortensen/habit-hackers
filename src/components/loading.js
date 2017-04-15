import React, {Component} from 'react'
import '../css/loading.css'

export default class Loading extends Component {
	constructor(){
		super()

		this.state = {
			loading: 'loading'
		}
	}

	componentDidMount(){
		const _this = this
		this.addDot = setInterval(function(){
			if(_this.state.loading.length>12)
				_this.setState({loading: 'loading'})
			else
				_this.setState({loading: _this.state.loading+=' .'})
		}, 400)
	}

	componentWillUnmount(){
		clearInterval(this.addDot)
	}
	
	render(){
		return (
			<div className="loading-wrapper">
				<h2>{this.state.loading}</h2>
			</div>
		)
	}
}

