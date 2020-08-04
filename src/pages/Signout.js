import React, { Component } from 'react';
import authService from '../apis/auth';
import { UserContext } from '../context/UserContext';

class Signout extends Component {
  static contextType = UserContext;

  async componentDidMount() {
    const { status } = await authService.post('/signout', {});
    this.context.signout();

    if (status === 200) {
      this.props.history.push('/');
    }
  }

  render() {
    return <div>Signing out...</div>;
  }
}

export default Signout;
