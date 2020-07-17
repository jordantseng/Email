import React, { Component } from 'react';

import emailService from '../../apis/email';
import Modal from '../Shared/Modal/Modal';

class InboxReply extends Component {
  state = {
    modalOpen: false,
  };

  email = {
    to: '',
    from: '',
    subject: '',
    text: '',
    html: '',
  };

  componentDidMount() {
    const { email } = this.props;
    const text = email.text.replace(/\n/gi, '\n> ');

    this.email = {
      ...email,
      to: email.from,
      from: email.to,
      subject: `RE:${email.subject}`,
      text: `\n\n\n-------- ${email.from} wrote: \n> ${text}`,
    };
  }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  onEmailSubmitClick = async (formValues) => {
    await emailService.post('/emails', formValues);
    this.toggleModal();
  };

  render() {
    const renderModal = this.state.modalOpen ? (
      <Modal
        title="Reply"
        toggleModal={this.toggleModal}
        email={this.email}
        onEmailSubmitClick={this.onEmailSubmitClick}
      />
    ) : null;

    return (
      <div>
        <button className="ui button primary" onClick={this.toggleModal}>
          Reply
        </button>
        {renderModal}
      </div>
    );
  }
}

export default InboxReply;

// const InboxReply = (props) => {
//   const [modal, setModalOpen] = useState(false);
//   const email = useRef({
//     to: '',
//     from: '',
//     subject: '',
//     text: '',
//     html: '',
//   });

//   useEffect(() => {
//     const text = props.email.text.replace(/\n/gi, '\n> ');

//     email.current = {
//       ...props.email,
//       to: props.email.from,
//       from: props.email.to,
//       subject: `RE:${props.email.subject}`,
//       text: `\n\n\n-------- ${props.email.from} wrote: \n> ${text}`,
//     };
//   }, [props.email]);

//   const onEmailSubmitClick = async (formValues) => {
//     await emailService.post('/emails', formValues);
//     setModalOpen(false);
//   };

//   const renderModal = modal ? (
//     <Modal
//       title="Reply"
//       setModalOpen={setModalOpen}
//       email={email}
//       onEmailSubmitClick={onEmailSubmitClick}
//     />
//   ) : null;

//   return (
//     <div>
//       <button className="ui button primary" onClick={() => setModalOpen(true)}>
//         Reply
//       </button>
//       {renderModal}
//     </div>
//   );
// };
