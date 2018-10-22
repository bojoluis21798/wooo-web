import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RootStore from "./stores/RootStore";
import { Provider } from "mobx-react";
// import {Loading}
// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/editProfile";
import Loading from "./pages/Loading";
import Matching from "./pages/matchingUI";
import Testing from './pages/Testing';
import Messaging from './pages/messaging/App';

class App extends Component {
  state = { loading: true };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    return this.state.loading ? (
      <Loading message="Preparing the app.." />
    ) : (
      <Provider store={RootStore}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/edit-profile" component={EditProfile} />
            <Route path="/loading" component={Loading} />
            <Route path="/matching" component={Matching} />
            <Route path='/testing' component={Testing} />
            <Route path='/messages' component={Messaging} />
            <Route path="*" component={Login} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
