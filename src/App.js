import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Pages
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
