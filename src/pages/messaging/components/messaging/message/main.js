import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Messages from '../messages/main';
import back from '../../../../../assets/images/left.png';
import './main.css';
import '../../../global/global.css';
import _ from 'lodash';
import { inject, observer } from 'mobx-react';

import axios from 'axios';
import firebase from 'firebase';
import firebaseConfig from '../../../config';

firebase.initializeApp(firebaseConfig);

const roomData = {
	roomId: 1,
	messages: [{
    profile_id: 14,
    img: "00.jpg",
		message: {
			type: "String",
			content: "REEE MOFO"
		},
		time: "IDK IF WANT",
	},{
    profile_id: 16,
    img: "01.jpg",
		message: {
			type: "Image",
			content: "IDK WHAT IT LOOKS LIKE (link maybe?)"
		},
		time: "IDK IF WANT",
	},{
    profile_id: 14,
    img: "00.jpg",
		message: {
			type: "String",
			content: "U STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHAT"
		},
		time: "IDK IF WANT",
	},]
}

@inject('store') @observer
export default class MessageBody extends Component {
  constructor(props) {
    super(props);
    this.messageRef = firebase.database().ref().child('roomData/'+this.props.ree.roomId);
    this.handleMessageListen();
  }

  state = {
    roomDatad: roomData,
    message: '',
    userId: this.props.store.userStore.profile_id
  }

  componentDidMount(){
    this.setState({message: ""});
    this.setState({userId: this.props.store.userStore.profile_id});
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.user) {
      console.log(nextProps.user);
      this.setState({'userId': nextProps.user.displayId});
    }
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSend() {
    console.log(this.props.store.userStore)
    if (this.state.message) {
      var newmessage = {
        userId: this.state.userId,
        message: {
          type: "String",
          content: this.state.message
        }
      }
      console.log(newmessage)
      this.messageRef.push(newmessage);
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
        console.log(message.val())
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

  MessageItems = () => {
    const posts = this.state.list;
    const items = [];

    _.mapKeys(posts, (data, index) => {
      items.push(
          <Messages
            {...data}
            key={index}
            id={index}
            userData={this.props.ree}
          />,
      );
    });

    return items;
  };
  render() {
    return (
      <div>
        <div className="content">
          <div className="back">
            <Link to='/' className="link">
              <img src={back} alt="Back"></img>
            </Link>
          </div>
          <div className="ree">
            <div className="name">
              <strong>{this.props.ree.pairedName}</strong>
            </div>
            <div className="last-message">
              <p>Active Now</p>
            </div>
          </div>
        </div>
        <div className="Messages">
          {this.MessageItems()}
        </div>
        <div className="search form-control">
          <div className="div-8">
            <input type="text" className="form-control" id="usr" placeholder="Send a Message" 
            onChange={this.handleChange.bind(this)}
            value={this.state.message}
            onKeyPress={this.handleKeyPress.bind(this)}
            />
          </div>
          <div className="div-2">
            <button className="button"
            onClick={this.handleSend.bind(this)}>
            SEND
            </button>
          </div>
        </div>
      </div>
    );
  }
}