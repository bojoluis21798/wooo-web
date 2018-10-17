import React, { Component } from 'react';
import './messageBody.css';
import Form from '../message_form/message_form';
import firebase from 'firebase';
import firebaseConfig from '../../../../config';

firebase.initializeApp(firebaseConfig);

export class MessageBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
    console.log(this.props.roomID)
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  handleLogOut() {
    firebase.auth().signOut();
    this.setState({user: "guest"});
  }
  render() {
    return (
      <div className="app">
        <div className="app__header">
          { !this.state.user ? (
            <button
              className="app__button"
              onClick={this.handleSignIn.bind(this)}
            >
              Sign in
            </button>
          ) : (
            <button
              className="app__button"
              onClick={this.handleLogOut.bind(this)}
            >
              Logout
            </button>
          )}
        </div>
        <div className="app__list">
          <Form roomID={this.props.roomID} user={this.state.user} />
        </div>
      </div>
    );
  }
}