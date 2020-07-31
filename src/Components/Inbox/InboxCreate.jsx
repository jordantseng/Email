import React, { Component } from 'react';
import emailService from '../../apis/email';
import UserContext from '../../context/UserContext';

import Modal from '../Shared/Modal';

class InboxCreate extends Component {
  state = {
    modalOpen: false,
  };

  static contextType = UserContext;

  email = {
    to: '',
    subject: '',
    text: '',
    from: `${this.context.user.username}@angular-email.com`,
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  onEmailSubmitClick = async formValues => {
    const { data } = await emailService.post('/emails', formValues);

    if (data.status === 'success') {
      this.toggleModal();
    }
  };

  renderModal() {
    return this.state.modalOpen ? (
      <Modal
        title="Compose"
        toggleModal={this.toggleModal}
        email={this.email}
        onEmailSubmitClick={this.onEmailSubmitClick}
      />
    ) : null;
  }

  render() {
    return (
      <div>
        <button
          className="ui button inverted primary fluid"
          onClick={this.toggleModal}>
          Compoese
        </button>
        {this.renderModal()}
      </div>
    );
  }
}
export default InboxCreate;
