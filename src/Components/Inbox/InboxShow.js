import React, { useState, useEffect } from 'react';

import emailService from '../../apis/email';
import InboxReply from '../Inbox/InboxReply';
import Loader from '../Shared/Loader';
import '../Inbox/InboxShow.css';

const InboxShow = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState({
    subject: '',
    from: '',
    to: '',
    text: '',
    html: '',
  });

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { data } = await emailService.get(`/emails/${match.params.id}`);
      const { subject, from, to, html, text } = data;
      setLoading(false);

      setEmail({ subject, from, to, html, text });
    })();
  }, [match.params.id]);

  if (loading) {
    return <Loader />;
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
};

export default InboxShow;
