import React, {Component} from 'react'
import Modal from '../../components/modal'

export default class NewIdeaModal extends Component {
  render() {
    return (
      <Modal display={this.props.display}>
        Test
      </Modal>
    )
  }
}
