import React, { Component } from 'react';
import authService from '../apis/auth';
import Loader from '../components/Shared/Loader';

class Signout extends Component {
  async componentDidMount() {
    const { signout, history } = this.props;

    try {
      await authService.post('/signout', {});
      signout();
      history.push('/');
    } catch (error) {
      // error handling
    }
  }

  render() {
    return <Loader text="Signing out..." />;
  }
}

export default Signout;
