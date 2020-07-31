import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../Actions';

const Signout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(signOut());
    })();
  }, [dispatch]);

  return <div>Signing out...</div>;
};

export default Signout;
