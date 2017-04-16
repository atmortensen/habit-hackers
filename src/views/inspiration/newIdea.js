import React, {Component} from 'react'
import Modal from '../../components/modal'
import * as api from './axiosRequests'
import makeList from './makeList'
// import '../../css/inspiration.css'

export default class NewIdeaModal extends Component {
	constructor(){
		super()

		this.state = {
			newIdea: '',
			similar: null
		}
	}

	inputHandler(e){
    this.setState({
      newIdea: e.target.value,
      similar: makeList(this.state.newIdea ,this.props.ideas).slice(0,3)
    })
  }

  submit(e){
    e.preventDefault()
  	api.createIdea(this.state.newIdea).then(ideas => {
  		this.props.updateIdeas(ideas)
  		this.props.hideModal()
      this.setState({newIdea: ''})
  	})
  }

  render() {
    return (
      <Modal changeState={this.props.changeModalState} display={this.props.display}>
        <h2>New habit idea...</h2>
        <h3>Should be something specific that can be tracked daily.</h3>

        <p>Bad example: Be healthier. Good example: Eat a healthy breakfast.</p> 
        <form
          className="newIdeaForm"
          onSubmit={this.submit.bind(this)}>
          <input 
          	type="text"
            onChange={this.inputHandler.bind(this)}
            value={this.state.newIdea} />
          <button 
            type="submit">
          	Submit
        	</button>
        </form>   

        <p className="">Please make sure that your habit doesn't already exist.</p>
        <ul className="similarList">

          {this.state.similar}
        </ul>
      </Modal>
    )
  }
}
