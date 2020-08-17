import React, { useState, useRef, useContext } from 'react';

import emailService from '../../apis/email';
import { UserContext } from '../../context1/UserContext';

import Modal from '../Shared/Modal';

const InboxCreate = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useContext(UserContext);

  const email = {
    to: '',
    subject: '',
    text: '',
    from: `${user.username}@angular-email.com`,
  }

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

export default InboxCreate;
