import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AuthService from '../apis/auth';
import NavBar from './NavBar/NavBar';
import Signin from '../Pages/Signin/Signin';
import Signup from '../Pages/Signup/Signup';
import Signout from '../Pages/Signout/Signout';
import Inbox from '../Pages/Inbox/Inbox';
import NotFound from '../Pages/NotFound/NotFound';

class App extends Component {
  state = {
    user: { username: '', authenticated: false },
  };

  async componentDidMount() {
    const { data } = await AuthService.get('/auth/signedin');
    this.setState({ user: { ...data } });

    if (this.state.user.authenticated) {
      this.props.history.push('/inbox');
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
      <div className="ui container">
        <NavBar user={user} />
        <Switch>
          <Route
            path="/signup"
            render={(routeProps) => {
              return (
                <Signup {...routeProps} authenticate={this.authenticate} />
              );
            }}
          />
          <Route
            path="/signout"
            render={(routeProps) => (
              <Signout {...routeProps} signout={this.signout} />
            )}
          />
          <Route
            path="/inbox"
            render={(routeProps) => {
              if (!user.authenticated) {
                return routeProps.history.push('/');
              }
              return <Inbox {...routeProps} user={user} />;
            }}
          />
          <Route path="/not-found" component={NotFound} />
          <Route
            exact
            path="/"
            render={(routeProps) => (
              <Signin {...routeProps} authenticate={this.authenticate} />
            )}
          />
          <Redirect to="not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
