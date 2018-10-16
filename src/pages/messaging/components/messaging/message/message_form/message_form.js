import React, { Component } from 'react';
import './message_form.css';
import Message from '../message_users/message_users';
import firebase from 'firebase';
export default class Form extends Component {
  constructor(props) {
    super(props);
    console.log('message/'+ this.props.roomID)
    this.state = {
      userName: 'Daniel',
      message: '',
      list: [],
    };
    this.messageRef = firebase.database().ref().child('message/'+ this.props.roomID);
    this.handleMessageListen();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user) {
      this.setState({'userName': nextProps.user.displayName});
    }
  }
  handleChange(event) {
    this.setState({message: event.target.value});
  }
  handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        message: this.state.message,
      }
      this.messageRef.push(newItem);
      this.setState({ message: '' });
      this.handleMessageListen();
    }
  }
  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }

  handleMessageListen(){
    var messg = null;
    this.messageRef
    .limitToLast(10)
    .on('value', message => {
        messg = message.val()
        console.log(messg)
    });
    if(messg != null){
        this.listenMessages()
    }
  }

  listenMessages() {
    this.messageRef
    .limitToLast(10)
    .on('value', message => {
        this.setState({
            list: Object.values(message.val()),
        });
    });
  }
  render() {
    return (
      <div className="form">
        <div className="form__message">
          { this.state.list.map((item, index) =>
            <Message key={index} message={item} />
          )}
        </div>
        <div className="form__row">
          <input
            className="form__input"
            type="text"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <button
            className="form__button"
            onClick={this.handleSend.bind(this)}
          >
            send
          </button>
        </div>
      </div>
    );
  }
}
