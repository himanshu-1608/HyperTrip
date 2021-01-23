import React from 'react';
import { NavLink } from 'react-router-dom';

import './SideNavigation.css';

const SideNavigation = (props) => {
  return (
    <div className='side-navigation'>
      <div className='center-align app-header'>
        <h2>
          <strong>Hyper Book</strong>
        </h2>
        <div>Buy tickets, watch ticket status, search buses</div>
        <h6>JUST FROM ONE PLACE !!!</h6>
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
