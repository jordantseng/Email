import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AuthService from '../apis/auth';

import NavBar from './NavBar/NavBar';
import Signin from '../Pages/Signin/Signin';
import Signup from '../Pages/Signup/Signup';
import Signout from '../Pages/Signout/Signout';
import Inbox from '../Pages/Inbox/Inbox';
import NotFound from '../Pages/NotFound/NotFound';

const App = ({ history }) => {
  const [user, setUser] = useState({
    username: '',
    authenticated: null,
  });

  useEffect(() => {
    (async () => {
      const { data } = await AuthService.get('/auth/signedin');
      setUser(data);
    })();
  }, []);

  useEffect(() => {
    if (user.authenticated) {
      history.push('/inbox');
    }
  }, [user.authenticated, history]);

  const authenticate = ({ username }) => {
    setUser({ username, authenticated: true });
  };

  const signout = () => {
    setUser({ username: '', authenticated: false });
  };

  return (
    <div className="ui container">
      <NavBar user={user} />
      <Switch>
        <Route
          path="/signup"
          render={(routeProps) => (
            <Signup {...routeProps} authenticate={authenticate} />
          )}
        />
        <Route
          path="/signout"
          render={(routeProps) => <Signout {...routeProps} signout={signout} />}
        />
        <Route
          path="/inbox"
          render={(routeProps) =>
            !user.authenticated ? (
              <Redirect to="/" />
            ) : (
              <Inbox {...routeProps} user={user} />
            )
          }
        />
        <Route path="/not-found" component={NotFound} />
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <Signin {...routeProps} authenticate={authenticate} />
          )}
        />
        <Redirect to="not-found" />
      </Switch>
    </div>
  );
};

export default App;
