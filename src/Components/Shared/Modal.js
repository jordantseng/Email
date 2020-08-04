import React from 'react';
import ReactDOM from 'react-dom';

import EmailForm from '../Shared/EmailForm';

const Modal = ({ title, email, toggleModal, onEmailSubmitClick }) => {
  return ReactDOM.createPortal(
    <div className="ui dimmer visible active" onClick={toggleModal}>
      <div
        className="ui modal visible active"
        onClick={(e) => e.stopPropagation()}>
        <i className="close icon" onClick={toggleModal}></i>
        <div className="header">
          <h3>{title}</h3>
        </div>
        <div className="content">
          <EmailForm email={email} onEmailSubmitClick={onEmailSubmitClick} />
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
