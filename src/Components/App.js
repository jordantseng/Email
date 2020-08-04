import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../actions';
import history from '../history';

import NavBar from './NavBar';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Inbox from '../pages/Inbox';
import NotFound from '../pages/NotFound';

const App = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(checkAuth());

      if (user.authenticated) {
        history.push('/inbox');
      }
    })();
  }, [user.authenticated, dispatch]);

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
};

export default App;
