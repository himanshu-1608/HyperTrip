import React, {useState, useCallback,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.css';
import Auth from './components/Auth/Auth';
import SideNavigation from './components/SideNavigation/SideNavigation';
import SearchBus from './components/SearchBus/SearchBus';
import BusDetail from './components/BusDetail/BusDetail';
import TicketStatus from './components/TicketStatus/TicketStatus';
import AdminBusDetail from './components/AdminBusDetail/AdminBusDetail';
import AuthContext from './context/auth-context';

const App = () => {
  
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [adminEmail, setAdminEmail] = useState();

  let checkToken, checkAdminEmail;
  useEffect(() => {
    checkToken = localStorage.getItem('adminToken');
    checkAdminEmail = localStorage.getItem('adminEmail');
    if(checkToken && checkToken.length > 0) {
      login(checkToken, checkAdminEmail);
    }
  },[]);

  const login = useCallback((token, adminEmail) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminEmail', adminEmail);
    setAdminEmail(adminEmail);
    setToken(token);
    setLoggedIn(true);
  },[]);

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    setToken('');
    setAdminEmail('');
    setLoggedIn(false);
  },[]);

  const unAuthenticatedRoutes = (
    <Switch>
      <Route path='/search' exact>
        <SearchBus />
      </Route>
      <Route path='/ticketStatus' exact>
        <TicketStatus />
      </Route>
      <Route path='/buses/:busId' exact>
        <BusDetail />
      </Route>
      <Route path='/login' exact>
        <Auth />
      </Route>
      <Redirect to='/search' />
    </Switch>
  );

  const authenticatedRoutes = (
    <Switch>
      <Route path='/search' exact>
        <SearchBus />
      </Route>
      <Route path="/addBus" exact>
        <div>add bus</div>
      </Route>
      <Route path="/buses/:busId" exact>
        <AdminBusDetail />
      </Route>
    </Switch>
  );
  
  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout,
      token: token,
      adminEmail: adminEmail}}>
      <Router>
      <div className='App'>
        <div style={{ display: 'flex' }}>
          <SideNavigation />
          {!isLoggedIn && (
            unAuthenticatedRoutes
          )}
          {isLoggedIn && (
            authenticatedRoutes
          )}
        </div>
      </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
