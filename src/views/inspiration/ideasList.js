import React, {Component} from 'react'
import Loading from '../../components/loading'
// import levenshtein from 'fast-levenshtein'

export default class IdeasList extends Component {
	constructor(){
		super()

		this.state = {
			ready: false
		}
	}

	componentDidMount(){
		setTimeout(()=>{
			this.setState({ready: true})
		}, 1000)
	}

	render(){
		if(!this.props.ideas || !this.state.ready) return <Loading /> 
		let list = this.props.ideas.filter((idea) => {
			return idea.idea.indexOf(this.props.search)!==-1 ? true: false
		}).map((idea) => {
			return (
				<li 
					key={idea._id}>
					{idea.idea}
					<a 
						href="#" 
						onClick={this.props.remove.bind(null, idea._id)}>
						X
					</a>
				</li>
			)
	  })

		if(list.length===0) list = <li>No Results</li>

		return <ul>{list}</ul>
	}
	
}
