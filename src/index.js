import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserContextProvider from './Context/UserContext';

import App from './Components/App';

ReactDOM.render(
  <UserContextProvider>
    <Router>
      <Route component={App} />
    </Router>
  </UserContextProvider>,
  document.getElementById('root')
);
