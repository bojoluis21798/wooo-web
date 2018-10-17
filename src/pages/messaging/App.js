import React, { Component } from 'react';
import { Messages } from './components/messages/main/main';
import { Messaging } from './components/messaging/main/main';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import { inject, observer } from 'mobx-react'
import AuthorizedLayout from '../../layouts/AuthorizedLayout';
import './App.css';

@inject('store') @observer
class App extends Component {
  componentDidMount(){
    console.log(this.props.store.userStore.biography)
  }
  render() {
    return (
      <AuthorizedLayout>
        <ToastContainer />
        <div className="App">
          <Router>
            <Switch>
              <Route path="/messages/:id" exact component={Messaging} />
              <Route path="*" component={Messages} />
            </Switch>
          </Router>
        </div>
      </AuthorizedLayout>
    );
  }
}

export default App;
