import React, {Component} from 'react'
import '../css/loading.css'

export default class Loading extends Component {
	constructor(){
		super()

		this.state = {
			loading: 'loading',
			error: ''
		}
	}

	componentDidMount(){
		// const _this = this

		this.addDot = setInterval(()=>{
			if(this.state.loading.length>12)
				this.setState({loading: 'loading'})
			else
				this.setState({loading: this.state.loading+' .'})
		}, 400)

		this.timeOut = setTimeout(()=>{
			this.setState({error: 'Taking longer than usual to load. Try refreshing the page and making sure you\'re logged in.'
			})
		}, 4000)
	}

	componentWillUnmount(){
		clearInterval(this.addDot)
		clearInterval(this.timeOut)
	}
	
	render(){
		return (
			<div className="loading-wrapper container">
				<h2>{this.state.loading}</h2>
				<h3>{this.state.error}</h3>
			</div>
		)
	}
}

