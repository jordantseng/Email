import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../actions';

import Loader from '../components/Shared/Loader';

const Signout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOut());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader text="Signing out..." />;
};

export default Signout;
