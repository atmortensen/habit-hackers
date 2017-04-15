import React, {Component} from 'react'
import Modal from '../../components/modal'
import levenshtein from 'fast-levenshtein'
import * as api from './axiosRequests'

export default class NewIdeaModal extends Component {
	constructor(){
		super()

		this.state = {
			newIdea: '',
			similar: null
		}
	}

	inputHandler(e){
    this.setState({newIdea: e.target.value})
    // let similarIdeas = this.props.ideas.filter(idea => {
    // 	levenshtein.get()
    // })
  }

  submit(){
  	api.createIdea(this.state.newIdea).then(ideas => {
  		this.props.updateIdeas(ideas)
  		this.props.hideModal()
  	})
  }

  render() {
    return (
      <Modal hideModal={this.props.hideModal} display={this.props.display}>
        <h2>New habit idea...</h2>
        <input 
        	type="text"
          onChange={this.inputHandler.bind(this)}
          value={this.state.newIdea} />
        <button 
        	onClick={this.submit.bind(this)}>
        	Submit
      	</button>
      </Modal>
    )
  }
}
