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
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"></link>
          <Router>
            <Switch>
              <Route path="/message" component={Messaging} />
              <Route path="*" component={Messages} />
            </Switch>
          </Router>
        </div>
      </AuthorizedLayout>
    );
  }
}

export default App;
