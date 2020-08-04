import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import emailService from '../../apis/email';

import Modal from '../Shared/Modal';

const InboxCreate = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector(state => state.user);

  const email = useRef({
    to: '',
    subject: '',
    text: '',
    from: `${user.username}@angular-email.com`,
  });

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
      email={email.current}
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
