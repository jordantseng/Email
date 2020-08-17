import React, { createContext, useState, useEffect } from 'react';
import authService from '../apis/auth';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    authenticated: null,
  });

  useEffect(() => {
    authService.get('/signedin').then(({ data }) => {
      setUser(data);
    });
  }, []);

  const authenticate = ({ username }) => {
    setUser({ username, authenticated: true });
  };

  const signout = () => {
    setUser({ username: '', authenticated: false });
  };

  return (
    <UserContext.Provider value={{ user, authenticate, signout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
