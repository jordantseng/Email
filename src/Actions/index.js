import * as actions from '../Actions/types';
import authService from '../apis/auth';
import history from '../history';

export const signUp = credentails => async (dispatch, getState) => {
  const { data } = await authService.post('/auth/signup', credentails);
  dispatch({
    type: actions.AUTHENTICATE,
    payload: { ...data, authenticated: true },
  });
  history.push('/inbox');
};

export const signIn = credentails => async (dispatch, getState) => {
  const { data } = await authService.post('/auth/signin', credentails);
  dispatch({
    type: actions.AUTHENTICATE,
    payload: { ...data, authenticated: true },
  });
  history.push('/inbox');
};

export const signOut = () => async (dispatch, getState) => {
  await authService.post('/auth/signout', {});
  dispatch({
    type: actions.AUTHENTICATE,
    payload: { username: '', authenticated: false },
  });
  history.push('/');
};

export const checkAuth = () => async (dispatch, getState) => {
  const { data } = await authService.get('/auth/signedin');
  dispatch({ type: actions.CHECK_AUTH, payload: data });
};
