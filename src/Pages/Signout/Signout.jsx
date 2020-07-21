import React, { useContext } from 'react';
import { useEffect } from 'react';

import { UserContext } from '../../Context/UserContext';

import authService from '../../apis/auth';

const Signout = ({ history }) => {
  const { signout } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      await authService.post('/auth/signout', {});
      signout();
      history.push('/');
    })();
  }, [signout, history]);

  return <div>Signing out...</div>;
};

export default Signout;
