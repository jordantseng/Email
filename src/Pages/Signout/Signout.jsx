import React from 'react';
import { useEffect } from 'react';

import authService from '../../apis/auth';

const Signout = ({ signout, history }) => {
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
