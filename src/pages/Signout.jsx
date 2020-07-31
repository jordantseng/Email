import React, { Component } from 'react';
import authService from '../apis/auth';

class Signout extends Component {
  async componentDidMount() {
    const { signout, history } = this.props;

    const { status } = await authService.post('/signout', {});
    signout();

    if (status === 200) {
      history.push('/');
    }
  }

  render() {
    return <div>Signing out...</div>;
  }
}

export default Signout;
