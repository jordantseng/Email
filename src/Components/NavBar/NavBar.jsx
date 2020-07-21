import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext';

const NavBar = () => {
  const { user } = useContext(UserContext);

  const renderNavLink = user.authenticated ? (
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

  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        React Email
      </Link>
      <div className="right menu">{renderNavLink}</div>
    </div>
  );
};

export default NavBar;
