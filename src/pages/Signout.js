import React, { useContext } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import authService from '../apis/auth';

import Loader from '../components/Shared/Loader';

const Signout = ({ history }) => {
  const { signout } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      await authService.post('/signout', {});
      try {
        signout();
        history.push('/');
      } catch (error) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader text="Signing out..." />;
};

export default Signout;
