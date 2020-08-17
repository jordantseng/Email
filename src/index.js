import React from 'react';
import ReactDOM from 'react-dom';
import UserContextProvider from './context1/UserContext';

import App from './components/App';

ReactDOM.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>,
  document.getElementById('root')
);
