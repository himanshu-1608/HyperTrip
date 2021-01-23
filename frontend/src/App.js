import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.css';
import SideNavigation from './components/SideNavigation/SideNavigation';
import SearchBus from './components/SearchBus/SearchBus';
import BusDetail from './components/BusDetail/BusDetail';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <div style={{ display: 'flex' }}>
          <SideNavigation />
          <Switch>
            <Route path='/search' exact>
              <SearchBus />
            </Route>
            <Route path='/ticketStatus' exact>
              <SearchBus />
            </Route>
            <Route path='/buses/:busId' exact>
              <BusDetail />
            </Route>
            <Redirect to='/' />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
