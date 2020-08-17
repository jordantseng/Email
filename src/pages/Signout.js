import React, { useContext } from 'react';
import { useEffect } from 'react';

import { UserContext } from '../context1/UserContext';

import authService from '../apis/auth';
import Loader from '../components/Shared/Loader';

const Signout = ({ history }) => {
  const { signout } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      await authService.post('/signout', {});
      signout();
      history.push('/');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader text="Signing out..." />;
};

export default Signout;
