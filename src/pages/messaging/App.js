import React, { Component } from 'react';
import { Messages } from './components/messages/main/main';
import { Messaging } from './components/messaging/main/main';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import { inject, observer } from 'mobx-react'
import AuthorizedLayout from '../../layouts/AuthorizedLayout';
import styled from "styled-components";

@inject('store') @observer
class App extends Component {
  componentDidMount(){
    console.log(this.props.store.userStore.profile_id)
  }
  render() {
    return (
      <AuthorizedLayout>
        <ToastContainer />
        <Main>
          <Router>
            <Switch>
              <Route path="/messages/:id" exact component={Messaging} />
              <Route path="*" component={Messages} />
            </Switch>
          </Router>
        </Main>
      </AuthorizedLayout>
    );
  }
}

export default App;


const Main = styled.div`
  text-align: center;
  background-color: #111111;
  height: 100vh;
  position: relative;
  overflow: auto;
  overflow-x: hidden;
  color: white;
  padding-left:5%;
  padding-right:5%;
  font-family: 'Apercu';
`;