import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/dashboard' component={Dashboard}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
