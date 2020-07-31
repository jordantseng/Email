import React, { useState, useEffect, useRef } from 'react';

import emailService from '../../apis/email';
import Modal from '../Shared/Modal/Modal';

const InboxReply = ({ email: loadedEmail }) => {
  const [modalOpen, setModalOpen] = useState(false);
  let email = useRef({
    to: '',
    from: '',
    subject: '',
    text: '',
    html: '',
  });

  useEffect(() => {
    const text = loadedEmail.text.replace(/\n/gi, '\n> ');

    email.current = {
      ...loadedEmail.email,
      to: loadedEmail.from,
      from: loadedEmail.to,
      subject: `RE:${loadedEmail.subject}`,
      text: `\n\n\n-------- ${loadedEmail.from} wrote: \n> ${text}`,
    };
  }, [loadedEmail]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const onEmailSubmitClick = async (formValues) => {
    await emailService.post('/emails', formValues);
    toggleModal();
  };

  const renderModal = modalOpen ? (
    <Modal
      title="Reply"
      toggleModal={toggleModal}
      email={email.current}
      onEmailSubmitClick={onEmailSubmitClick}
    />
  ) : null;

  return (
    <div>
      <button className="ui button primary" onClick={toggleModal}>
        Reply
      </button>
      {renderModal}
    </div>
  );
};

export default InboxReply;
