import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import emailService from '../../apis/email';
import '../../Components/InboxIndex/InboxIndex.css';

class InboxIndex extends Component {
  state = {
    emails: [],
  };
  _isMounted = false;

  async componentDidMount() {
    this._isMounted = true;
    const { data } = await emailService.get('/emails');
    if (this._isMounted) {
      this.setState({ emails: data });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="ui celled list">
        {this.state.emails.map((email) => (
          <div key={email.id} className="item">
            <NavLink to={`/inbox/${email.id}`}>
              <div className="content">
                <div className="header trim">{email.subject}</div>
                <p className="trim">{email.from}</p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    );
  }
}

export default InboxIndex;
