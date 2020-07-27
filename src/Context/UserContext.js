import React, { createContext, useEffect, useReducer } from 'react';
import authService from '../apis/auth';

const ACTIONS = {
  AUTHENTICATE: 'AUTHENTICATE',
  FETCH_DATA: 'FETCH_DATA',
};

const initialState = {
  username: '',
  authenticated: null,
};

const AppReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.AUTHENTICATE:
      return { ...state, ...action.payload };

    case ACTIONS.FETCH_DATA:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export const UserContext = createContext(initialState);

const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    authService.get('/auth/signedin').then(({ data }) => {
      dispatch({ type: ACTIONS.FETCH_DATA, payload: data });
    });
  }, []);

  const authenticate = ({ username }) => {
    dispatch({
      type: ACTIONS.AUTHENTICATE,
      payload: { username, authenticated: true },
    });
  };

  const signout = () => {
    dispatch({
      type: ACTIONS.AUTHENTICATE,
      payload: { username: '', authenticated: false },
    });
  };

  return (
    <UserContext.Provider value={{ user, authenticate, signout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
