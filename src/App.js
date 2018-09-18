import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import RootStore from './stores/RootStore'
import { Provider } from 'mobx-react'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

class App extends Component {
  render() {
    return (
      <Provider store={RootStore}>
        <Router>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='*' component={Dashboard} />
          </Switch>
        </Router>
      </Provider>
      
    )
  }
}

export default App
