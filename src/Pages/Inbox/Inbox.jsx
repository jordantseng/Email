import React from 'react';
import { Route, Switch } from 'react-router-dom';

import InboxIndex from '../../Components/InboxIndex/InboxIndex';
import InboxShow from '../../Components/InboxShow/InboxShow';
import InboxCreate from '../../Components/InboxCreate/InboxCreate';
import InboxPlaceholder from '../../Components/InboxPlaceholder/InboxPlaceholder';

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
            <Route exact path="/inbox" component={InboxPlaceholder} />
            <Route
              path="/inbox/:id"
              render={(routeProps) => <InboxShow {...routeProps} user={user} />}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
