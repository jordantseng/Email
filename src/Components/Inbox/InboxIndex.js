import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import emailService from '../../apis/email';
import './InboxIndex.css';

const InboxIndex = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await emailService.get('/emails');
      setEmails(data);
    })();
  }, []);

  return (
    <div className="ui celled list">
      {emails.map(email => (
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
};

export default InboxIndex;
