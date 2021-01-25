import React, {useState, useCallback, useContext} from 'react';
import { NavLink } from 'react-router-dom';

import './SideNavigation.css';
import AuthContext from '../../context/auth-context';

const SideNavigation = (props) => {
  
  const auth = useContext(AuthContext);
  
  const doLogOut = () => {
    auth.logout();
  }

  return (
    <div className='side-navigation'>
      <div className='app-header'>
        <h1>
          <strong>Hyper Book</strong>
        </h1>
        <div>Buy tickets <br/>Watch ticket status<br />Search buses</div>
        <h5>JUST FROM ONE PLACE !!!</h5>
      </div>
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
          <NavLink
            onClick={doLogOut}
            className='NavLink'
            to='/search'
            exact>
            LogOut
          </NavLink>
        </React.Fragment>
      )}
    </div>
  );
};

export default SideNavigation;
