import React, { useState } from './node_modules/react';
import { connect } from './node_modules/react-redux';
import emailService from '../../apis/email';

import Modal from '../Shared/Modal';

const InboxCreate = ({ user }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const email = {
    to: '',
    subject: '',
    text: '',
    from: `${user.username}@angular-email.com`,
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const onEmailSubmitClick = async formValues => {
    const { data } = await emailService.post('/emails', formValues);
    if (data.status === 'success') {
      toggleModal();
    }
  };

  const renderModal = modalOpen ? (
    <Modal
      title="Compose"
      toggleModal={toggleModal}
      email={email}
      onEmailSubmitClick={onEmailSubmitClick}
    />
  ) : null;

  return (
    <div>
      <button
        className="ui button inverted primary fluid"
        onClick={toggleModal}>
        Compoese
      </button>
      {renderModal}
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(InboxCreate);
