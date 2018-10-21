import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Messages from '../messages/main';
import styled from "styled-components";
import back from '../../../../../assets/images/left.png';
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
        <Content>
          <Back>
            <Link to='/'>
              <img src={back} alt="Back"></img>
            </Link>
          </Back>
          <Ree>
            <Name>
              <strong>{this.props.ree.pairedName}</strong>
            </Name>
            <LastMessage>
              <p>Active Now</p>
            </LastMessage>
          </Ree>
        </Content>
        <div>
          {this.MessageItems()}
        </div>
        {/* search form-control -to check */}
        <Chat>
          <Div8>
            <Input type="text" id="usr" placeholder="Send a Message" 
            onChange={this.handleChange.bind(this)}
            value={this.state.message}
            onKeyPress={this.handleKeyPress.bind(this)}
            />
          </Div8>
          <Div2>
            <ButtonA
            onClick={this.handleSend.bind(this)}>
            SEND
            </ButtonA>
          </Div2>
        </Chat>
      </div>
    );
  }
}

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const Back = styled.div`
  float: left !important;
  color: white !important;
`;

const Ree = styled.div`
  margin:0 auto;
  text-align: center;
`;

const Name = styled.div`
  font-size: 1.5em;
`;

const ButtonA = styled.button`
  font-weight: 100;
  font-size: 15px;
  color: #ffffff;
  background-color: #191919;
  letter-spacing: 0.01px;
  text-align: center;
  border-radius: 5px;
  border: 0;
  padding: 12px;
  width: 90px;
  margin: auto;
  margin-bottom: 5px;
  margin-right: 15px;
  transition: 0.5s all ease;
  cursor: pointer;
`;

const Div2 = styled.div`
  width: 20%;
  display: inline-block;
`;

const Div8 = styled.div`
  width: 80%;
  display: inline-block;
`;

const LastMessage = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis !important;
`;

const Chat = styled.div`
  height: 45px;
  min-height: 45px;
  width: 100%;
  font-weight: 20;
  font-size: 18px;
  padding: 15px;
  color: #ffffff !important;
  background-color: #191919 !important;
  border-radius: 5px;
  border: none;
  justify-items: center;
  overflow: hidden;
  resize: hidden;
  border: 1px solid #191919 !important;

  &:focus {
    outline: none !important;
    border: 1px solid #f51a63 !important;
  }
`;

const Input = styled.input`
  height: 45px;
  min-height: 45px;
  width: 100%;
  font-weight: 20;
  font-size: 18px;
  padding: 15px;
  color: #ffffff !important;
  background-color: #191919 !important;
  border-radius: 5px;
  border: none;
  justify-items: center;
  overflow: hidden;
  resize: hidden;
  border: 1px solid #191919 !important;
  
  &:focus {
    outline: none !important;
    border: 1px solid #f51a63 !important;
  }
`;