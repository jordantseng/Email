import React from 'react';
import { Route, Switch } from 'react-router-dom';

import InboxIndex from '../components/Inbox/InboxIndex';
import InboxShow from '../components/Inbox/InboxShow';
import InboxCreate from '../components/Inbox/InboxCreate';
import InboxPlaceholder from '../components/Inbox/InboxPlaceholder';

const Inbox = () => {
  return (
    <div>
      <div className="ui grid stackable">
        <div className="five wide column">
          <InboxCreate />
          <InboxIndex />
        </div>

        <div className="eleven wide column">
          <Switch>
            <Route exact path="/inbox" component={InboxPlaceholder} />
            <Route path="/inbox/:id" component={InboxShow} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
