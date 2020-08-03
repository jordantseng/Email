import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavBar extends Component {
  renderNavLink() {
    return this.props.user.authenticated ? (
      <React.Fragment>
        <NavLink to="/inbox" className="ui item">
          Inbox
        </NavLink>
        <NavLink to="/signout" className="ui item">
          Sign Out
        </NavLink>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <NavLink to="/signup" className="ui item">
          Sign Up
        </NavLink>
        <NavLink exact to="/" className="ui item">
          Sign In
        </NavLink>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          React Email
        </Link>
        <div className="right menu">{this.renderNavLink()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(NavBar);
