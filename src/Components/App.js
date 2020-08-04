import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '../history';
import { UserContext } from '../context/UserContext';

import NavBar from './NavBar';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Inbox from '../pages/Inbox';
import NotFound from '../pages/NotFound';

class App extends Component {
  static contextType = UserContext;

  render() {
    const { user } = this.context;

    return (
      <Router history={history}>
        <div className="ui container">
          <NavBar />
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/signout" component={Signout} />
            <Route
              path="/inbox"
              render={routeProps =>
                !user.authenticated ? (
                  <Redirect to="/" />
                ) : (
                  <Inbox {...routeProps} />
                )
              }
            />
            <Route path="/not-found" component={NotFound} />
            <Route exact path="/" component={Signin} />
            <Redirect to="not-found" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
