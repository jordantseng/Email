import React from 'react';
import { Route, Switch } from 'react-router-dom';

import InboxIndex from '../../Components/Inbox/InboxIndex';
import InboxShow from '../../Components/Inbox/InboxShow';
import InboxCreate from '../../Components/Inbox/InboxCreate';
import InboxPlaceholder from '../../Components/Inbox/InboxPlaceholder';

const Inbox = ({ user }) => {
  return (
    <div>
      <div className="ui grid stackable">
        <div className="five wide column">
          <InboxCreate user={user} />
          <InboxIndex />
        </div>
        <div className="eleven wide column">
          <Switch>
            <Route
              path="/inbox/:id"
              render={routeProps => <InboxShow {...routeProps} />}
            />
            <Route exact path="/inbox" component={InboxPlaceholder} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
