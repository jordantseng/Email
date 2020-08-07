import React, { Component } from 'react';
import authService from '../apis/auth';
import { UserContext } from '../context/UserContext';

import Loader from '../components/Shared/Loader';

class Signout extends Component {
  static contextType = UserContext;

  async componentDidMount() {
    try {
      await authService.post('/signout', {});
      this.context.signout();
      this.props.history.push('/');
    } catch (error) {
      // error handling
    }
  }

  render() {
    return <Loader text="Signing out..." />;
  }
}

export default Signout;
