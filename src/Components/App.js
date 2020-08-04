import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '../history';
import AuthService from '../apis/auth';
import UserContext from '../context/UserContext';

import NavBar from './NavBar';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Inbox from '../pages/Inbox';
import NotFound from '../pages/NotFound';

class App extends Component {
  state = {
    user: { username: '', authenticated: null },
  };

  async componentDidMount() {
    const { data } = await AuthService.get('/signedin');
    this.setState({ user: { ...data } });

    if (this.state.user.authenticated) {
      history.push('/inbox');
    }
  }

  authenticate = ({ username }) => {
    this.setState({ user: { username, authenticated: true } });
  };

  signout = () => {
    this.setState({ user: { username: '', authenticated: false } });
  };

  render() {
    const { user } = this.state;

    return (
      <UserContext.Provider value={this.state}>
        <Router history={history}>
          <div className="ui container">
            <NavBar />
            <Switch>
              <Route
                path="/signup"
                render={routeProps => (
                  <Signup {...routeProps} authenticate={this.authenticate} />
                )}
              />
              <Route
                path="/signout"
                render={routeProps => (
                  <Signout {...routeProps} signout={this.signout} />
                )}
              />
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
              <Route
                exact
                path="/"
                render={routeProps => (
                  <Signin {...routeProps} authenticate={this.authenticate} />
                )}
              />
              <Redirect to="not-found" />
            </Switch>
          </div>
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App;
