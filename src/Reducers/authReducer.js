import * as actions from '../Actions/types';

const initialState = {
  username: '',
  authenticated: null,
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTHENTICATE:
      return { ...state, ...action.payload };

    case actions.CHECK_AUTH:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default authReducers;
