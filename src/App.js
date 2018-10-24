import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RootStore from "./stores/RootStore";
import { Provider } from "mobx-react";
import { hot } from 'react-hot-loader';

// Pages
import Login from "./pages/Login";
import Loading from "./pages/Loading";
import Matching from "./pages/Matching";
import Messages from './pages/Messages'
import MessageThread from './pages/MessageThread';
import EditProfile from './pages/EditProfile'

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
            <Route path="/edit-profile" component={EditProfile} />
            <Route path="/matching" component={Matching} />
            <Route path="/messages" exact component={Messages} />
            <Route exact path="/messages/:id" component={MessageThread} />
            <Route path="*" component={Login} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(App)
