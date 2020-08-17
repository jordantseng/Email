import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions';
import Loader from '../Components/Shared/Loader';

class Signout extends Component {
  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return <Loader text="Signing out..." />;
  }
}

const mapDispatchToProps = {
  signOut,
};

export default connect(null, mapDispatchToProps)(Signout);
