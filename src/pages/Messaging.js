import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import back from '../assets/images/left.png';
import _ from 'lodash';
import { inject, observer } from 'mobx-react';

import axios from 'axios';
import firebase from 'firebase';

const config =  {
    apiKey: "AIzaSyCXAvzvQo7-pVZJ4e74jpP5Zq5AKBn68sg",
    authDomain: "wooo-4fe01.firebaseapp.com",
    databaseURL: "https://wooo-4fe01.firebaseio.com",
    projectId: "wooo-4fe01",
    storageBucket: "wooo-4fe01.appspot.com",
    messagingSenderId: "17995314822"

    // apiKey: "AIzaSyAaODb7bCoZPvV4gdVyG_sV_Lc1_GuVdwg",
    // authDomain: "react-intro-37cd1.firebaseapp.com",
    // databaseURL: "https://react-intro-37cd1.firebaseio.com",
    // projectId: "react-intro-37cd1",
    // storageBucket: "react-intro-37cd1.appspot.com",
    // messagingSenderId: "181293593583"
};
  
firebase.initializeApp(config);

export class Messaging extends Component {
  state = {
    props: this.props.location.state,
  };

  componentDidMount(){
    
  }

  render() {
    return (
      <div>
        <MessageBody ree={this.state.props}/>
      </div>
    );
  }
}

@inject('store') @observer
class MessageBody extends Component {
  constructor(props) {
    super(props);
    this.messageRef = firebase.database().ref().child('roomData/'+this.props.ree.roomId);
    this.handleMessageListen();
  }

  state = {
    message: '',
    userId: this.props.store.userStore.profile_id
  }

  componentDidMount(){
    this.setState({message: ""});
    this.setState({userId: this.props.store.userStore.profile_id});
    this.handleMessageListen();
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.user) {
      this.setState({'userId': nextProps.user.displayId});
    }
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSend() {
    if (this.state.message) {
      var newmessage = {
        userId: this.state.userId,
        message: {
          type: "String",
          content: this.state.message
        }
      }
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
            user1={this.state.userId}
            user2={this.props.ree.pairedId}
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
            <Link to='/messsages'>
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

@inject('store') @observer
class Messages extends Component {
  render() {
    return (
      <div>
        {this.props.userData.pairedId === this.props.userId && (
          <Div>
            <Div2>
              <Img src={this.props.userData.pairedImage} alt={this.props.userData.pairedId}/>
            </Div2>
            <Div3>
              <div>
                <p>{this.props.message.content}</p>
              </div>
            </Div3>
          </Div>
        )}
        {this.props.userId === this.props.store.userStore.profile_id && (
          <DivContent>
            <Div4>
              <div>
                <p>{this.props.message.content}</p>
              </div>
            </Div4>
            <Div2>
              <Img src={this.props.store.userStore.profilePicture} alt={this.props.profile_id}/>
            </Div2>
          </DivContent>
        )}
      </div>
    );
  }
}

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const Div3 = styled.div`
  width: 80%;
  display: inline-block;
  text-align: left;
  margin: 3px;
  padding: 1px;
  padding-left: 5px;
  background-color: #191919;
  border-radius: 10px;
`;

const Div4 = styled.div`
  width: 80%;
  display: inline-block;
  text-align: left;
  margin: 3px;
  padding: 1px;
  padding-left: 5px;
  background-color: #FC3F73;
  border-radius: 10px;
`;

const DivContent = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 50%;
`;
