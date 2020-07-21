import React, { useState, useRef, useContext } from 'react';

import emailService from '../../apis/email';
import { UserContext } from '../../Context/UserContext';

import Modal from '../Shared/Modal/Modal';

const InboxCreate = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useContext(UserContext);

  const email = useRef({
    to: '',
    subject: '',
    text: '',
    from: `${user.username}@angular-email.com`,
  });

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const onEmailSubmitClick = async (formValues) => {
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

// class InboxCreate extends Component {
//   state = {
//     modalOpen: false,
//   };

//   email = {
//     to: '',
//     subject: '',
//     text: '',
//     from: `${this.props.user.username}@angular-email.com`,
//   };

//   toggleModal = () => {
//     this.setState({ modalOpen: !this.state.modalOpen });
//   };

//   onEmailSubmitClick = async (formValues) => {
//     const { data } = await emailService.post('/emails', formValues);
//     if (data.status === 'success') {
//       this.toggleModal();
//     }
//   };

//   renderModal() {
//     return this.state.modalOpen ? (
//       <Modal
//         title="Compose"
//         toggleModal={this.toggleModal}
//         email={this.email}
//         onEmailSubmitClick={this.onEmailSubmitClick}
//       />
//     ) : null;
//   }

//   render() {
//     return (
//       <div>
//         <button
//           className="ui button inverted primary fluid"
//           onClick={this.toggleModal}>
//           Compoese
//         </button>
//         {this.renderModal()}
//       </div>
//     );
//   }
// }
export default InboxCreate;

// const InboxCreate = (props) => {
//   const [modalOpen, setModalOpen] = useState(false);

//   const email = {
//     to: '',
//     subject: '',
//     text: '',
//     from: `${props.user.username}@angular-email.com`,
//   };

//   const onEmailSubmitClick = async (formValues) => {
//     const { data } = await emailService.post('/emails', formValues);
//     if (data.status === 'success') {
//       setModalOpen(false);
//     }
//   };

//   const renderModal = modalOpen ? (
//     <Modal
//       title="Compose"
//       setModalOpen={setModalOpen}
//       email={email}
//       onEmailSubmitClick={onEmailSubmitClick}
//     />
//   ) : null;

//   return (
//     <div>
//       <button
//         className="ui button inverted primary fluid"
//         onClick={() => setModalOpen(true)}>
//         Compoese
//       </button>
//       {renderModal}
//     </div>
//   );
// };
