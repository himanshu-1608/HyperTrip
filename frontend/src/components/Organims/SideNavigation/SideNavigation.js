import React, { useState, useCallback, useContext } from 'react';
import { NavLink } from 'react-router-dom';
// import { BiSearchAlt } from 'react-icons';
import './SideNavigation.css';
import AuthContext from '../../../context/auth-context';

const SideNavigation = (props) => {
  const auth = useContext(AuthContext);

  const doLogOut = () => {
    auth.logout();
  };

  return (
    <div className='side-navigation'>
      <div className='nav-header'>
		    Hyper book
      </div>
      <div className='nav-links'>
        <NavLink
          activeClassName='active-nav'
          className='NavLink'
          to='/search'
          exact>
          Search Bus
        </NavLink>
        {!auth.isLoggedIn && (
          <React.Fragment>
            <NavLink
              activeClassName='active-nav'
              className='NavLink'
              to='/ticketStatus'
              exact>
              View Ticket Status
            </NavLink>
            <NavLink
              activeClassName='active-nav'
              className='NavLink'
              to='/login'
              exact>
              Are you an Admin?
            </NavLink>
          </React.Fragment>
        )}
        {auth.isLoggedIn && (
          <React.Fragment>
            <NavLink
              activeClassName='active-nav'
              className='NavLink'
              to='/addBus'
              exact>
              Add Bus
            </NavLink>
            <NavLink onClick={doLogOut} className='NavLink' to='/search' exact>
              LogOut
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default SideNavigation;
