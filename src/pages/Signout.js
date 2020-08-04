import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions';

class Signout extends Component {
  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return <div>Signing out...</div>;
  }
}

const mapDispatchToProps = {
  signOut,
};

export default connect(null, mapDispatchToProps)(Signout);
