import React, { Component } from 'react';
import './message_form.css';
import Message from '../message_users/message_users';
import firebase from 'firebase';
import firebaseConfig from '../../../../config';

firebase.initializeApp(firebaseConfig);

export default class Form extends Component {
  constructor(props) {
    super(props);
    console.log('message/'+ this.props.roomID)
    this.state = {
      message_details: {
        profile_id: 16,
        userName: "",
        message: [{
          type: "String",
          content: ""
        }],
        time: "",
      },
      list:[]
    };
    this.messageRef = firebase.database().ref().child('roomData/16R14');
    this.handleMessageListen();
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.user) {
      this.setState({'userName': nextProps.user.displayName});
    }
  }

  handleChange(event) {
    this.setState({message: event.target.value});
    console.log(this.state.message)
  }
  handleSend() {
    if (this.state.message) {
      var newmessage = {
        type: "String",
        content: this.state.message
      }
      var newItem = {
        profile_id: 5123,
        userName: this.state.userName,
        message: new Array(),
        time: "12:32:33"
      }
      newItem.message.push(newmessage);
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
