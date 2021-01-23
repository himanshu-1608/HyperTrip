import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.css';
import SideNavigation from './components/SideNavigation/SideNavigation';
import SearchBus from './components/SearchBus/SearchBus';
import AuthContext from './context/auth-context';

const App = () => {
  return (
    // <AuthContext.Provider
    //   value={{
    //     isLoggedIn: isLoggedIn,
    //     login: login,
    //     logout: logout,
    //     token: token,
    //     userName: userName,
    //   }}
    // >
    <Router>
      <div className='App'>
        <div style={{ display: 'flex' }}>
          <SideNavigation />
          <Switch>
            <Route path='/search' exact>
              <SearchBus />
            </Route>
            <Route path='/ticketStatus' exact>
              <div className='white-text'>ticketstatus</div>
            </Route>
            <Redirect to='/' />
          </Switch>
        </div>
      </div>
    </Router>
    // </AuthContext.Provider>
  );
};

export default App;
