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
      showModal: false
		}

    this.removeIdea = this.removeIdea.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
		this.updateIdeas = this.updateIdeas.bind(this)
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
    this.setState({showModal: true})
  }

  hideModal(){
    this.setState({showModal: false})
  }

  updateIdeas(ideas){
    this.setState({ideas: ideas})
  }

  render() {
    return (
      <div>
        <h1>Inspiration</h1>
        <h3>Take a look at some of the habits that other people have been tracking using Habit Hackers.</h3>
        <input 
        	type="text"
          onChange={this.searchHandler.bind(this)}
          value={this.state.search} />
        <button onClick={this.showModal}>New Habit</button>
        <NewIdeaModal 
          ideas={this.state.ideas} 
          hideModal={this.hideModal} 
          display={this.state.showModal} 
          updateIdeas={this.updateIdeas} />
        <IdeasList 
        	ideas={this.state.ideas} 
        	remove={this.removeIdea}
        	search={this.state.search} />
      </div>
    )
  }
}
