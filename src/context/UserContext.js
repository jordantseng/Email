import React, { Component, createContext } from 'react';
import AuthService from '../apis/auth';
import history from '../history';

export const UserContext = createContext(null);

class UserContextProvider extends Component {
  state = {
    user: { username: '', authenticated: null },
  };

  async componentDidMount() {
    const { data } = await AuthService.get('/signedin');
    this.setState({ user: { ...data } });

    if (this.state.user.authenticated) {
      history.push('/inbox');
    }
  }

  authenticate = ({ username }) => {
    this.setState({ user: { username, authenticated: true } });
  };

  signout = () => {
    this.setState({ user: { username: '', authenticated: false } });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          authenticate: this.authenticate,
          signout: this.signout,
        }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
