import React, {Component} from 'react'
import IdeasList from './ideasList'
import NewIdeaModal from './newIdea'

import * as api from './axiosRequests'

export default class Inspiration extends Component {
	constructor(){
		super()

		this.state = {
			ideas: null,
			search: '',
      showModal: 0
		}

    this.removeIdea = this.removeIdea.bind(this)
		this.showModal = this.showModal.bind(this)
	}

	componentDidMount(){
		api.getIdeas().then((response)=>this.setState({ideas: response}))
	}

	removeIdea(id){
		this.setState({ideas: null})
		api.removeIdea(id).then((response)=>this.setState({ideas: response}))
	}

	searchHandler(e){
    this.setState({search: e.target.value})
  }

  showModal(){
    this.setState({showModal: 1})
  }

  render() {
    return (
      <div>
        <h1>Inspiration</h1>
        <input 
        	type="text"
          onChange={this.searchHandler.bind(this)}
          value={this.state.search} />
        <button onClick={this.showModal}>New Habit</button>
        <NewIdeaModal display={this.state.showModal} />
        <IdeasList 
        	ideas={this.state.ideas} 
        	remove={this.removeIdea}
        	search={this.state.search} />
      </div>
    )
  }
}
