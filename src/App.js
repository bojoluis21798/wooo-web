import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RootStore from './stores/RootStore';
import {Provider} from 'mobx-react';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
class App extends Component {
  render() {
    return (
      <Provider store={RootStore.userStore}>
        <Router>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route path='/dashboard' component={Dashboard}/>
          </Switch>
        </Router>
      </Provider>
      
    );
  }
}

export default App;
