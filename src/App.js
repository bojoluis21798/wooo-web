import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RootStore from "./stores/RootStore";
import { Provider } from "mobx-react";
// import {Loading}
// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/editProfile";
import Loading from "./pages/Loading";


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
            <Route path="/loading" component={Loading} />
            <Route path="*" component={Login} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
