import React from 'react';
import logo from './logo.svg';
import './App.css';

import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';

import Dashboard from './Container/Dashboard/Dashboard';
import Store from "./Container/Dashboard/Store"
import Login  from './Container/Login';
import NoMatch  from './Container/NoMatch';

function App() {
  return (
    
<Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/game">Game</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Store>
              <Login/>
            </Store>
 
          </Route>
          <Route path="/game">

            <Store>
            <Dashboard />
            </Store>
          </Route>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    </Router>
  


    
  );
}

export default App;
