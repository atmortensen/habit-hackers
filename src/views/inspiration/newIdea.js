import React, {Component} from 'react'
import Modal from '../../components/modal'

export default class NewIdeaModal extends Component {
  render() {
    return (
      <Modal hideModal={this.props.hideModal} display={this.props.display}>
        Test
      </Modal>
    )
  }
}
