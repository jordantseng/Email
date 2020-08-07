import React, { Component } from 'react';

import emailService from '../../apis/email';
import InboxReply from './InboxReply';
import Loader from '../Shared/Loader';
import './InboxShow.css';

class InboxShow extends Component {
  state = {
    email: {
      subject: '',
      from: '',
      to: '',
      text: '',
      html: '',
    },
    isLoading: null,
  };

  componentDidMount() {
    this.fetchEmail();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.fetchEmail();
    }
  }

  async fetchEmail() {
    this.setState({ isLoading: true });

    const { data } = await emailService.get(
      `/emails/${this.props.match.params.id}`
    );
    const { subject, from, to, html, text } = data;

    this.setState({
      email: { subject, from, to, html, text },
      isLoading: !this.state.isLoading,
    });
  }

  render() {
    const { email, isLoading } = this.state;

    if (isLoading) {
      return <Loader text="Loading..." />;
    }
    return (
      <div>
        <div className="header">
          <div>
            <h3>{email.subject}</h3>
            <div>
              From: <i>{email.from}</i>
            </div>
            <div>
              To: <i>{email.to}</i>
            </div>
          </div>
          <div>
            <InboxReply email={email} />
          </div>
        </div>
        <div className="ui divider content"></div>
        <div dangerouslySetInnerHTML={{ __html: email.html }}></div>
      </div>
    );
  }
}

export default InboxShow;
