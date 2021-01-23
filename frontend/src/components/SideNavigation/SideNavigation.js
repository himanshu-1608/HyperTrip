import React from 'react';
import { NavLink } from 'react-router-dom';

import './SideNavigation.css';

const SideNavigation = (props) => {
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
      <NavLink
        activeClassName='active-nav'
        className='NavLink'
        to='/ticketStatus'
        exact>
        View Ticket Status
      </NavLink>
    </div>
  );
};

export default SideNavigation;
