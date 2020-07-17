import React from 'react';
import { useEffect } from 'react';

import authService from '../../apis/auth';

const Signout = (props) => {
  useEffect(() => {
    async function signout() {
      await authService.post('/auth/signout', {});
      props.signout();
      props.history.push('/');
    }

    signout();
  }, [props]);

  return <div>Signing out...</div>;
};

export default Signout;
