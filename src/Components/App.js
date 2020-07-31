import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../Actions';

import NavBar from './NavBar/NavBar';
import Signin from '../Pages/Signin/Signin';
import Signup from '../Pages/Signup/Signup';
import Signout from '../Pages/Signout/Signout';
import Inbox from '../Pages/Inbox/Inbox';
import NotFound from '../Pages/NotFound/NotFound';

const App = ({ history }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(checkAuth());

      if (user.authenticated) {
        history.push('/inbox');
      }
    })();
  }, [user.authenticated, history, dispatch]);

  return (
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
  );
};

export default App;
