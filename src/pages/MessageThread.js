import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import back from '../assets/images/left.png';
import video from '../assets/images/video.png';
import { inject, observer } from 'mobx-react';
import firebase from 'firebase';
import AuthorizedLayout from '../layouts/AuthorizedLayout';
import Messages from '../components/Messages'

const config =  {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DBURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID
};
  
firebase.initializeApp(config);

@inject('store') @observer
export default class MessageThread extends Component {
  constructor(props) {
    super(props);
    this.messageRef = firebase.database().ref().child('roomData/'+this.props.location.state.roomId);
    this.handleMessageListen();
  }

  state = {
    message: '',
    userId: this.props.store.userStore.profile_id
  }

  componentDidMount() {
    this.setState({message: ""});
    this.setState({userId: this.props.store.userStore.profile_id});
    this.handleMessageListen();
  }

  static getDerivedStateFromProps(nextProps) {
    return nextProps.user? ({ userId: nextProps.user.displayId }): nextProps;
  }
  
  handleChange = event => {
    this.setState({message: event.target.value});
  }

  handleSend = () => {
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

  handleKeyPress = event => {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }

  handleMessageListen = () => {
    var messg = null;
    this.messageRef
    .limitToLast(10)
    .on('value', message => {
        messg = message.val()
    });
    if(messg !== null){
        this.listenMessages()
    }
  }

  listenMessages = () => {
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
      <AuthorizedLayout>
        <Content>
          <Back>
            <Link to='/messsages'>
              <img src={back} alt="Back"></img>
            </Link>
          </Back>
          <Ree>
            <Name>
              <strong>{this.props.location && this.props.location.state.pairedName}</strong>
            </Name>
            <LastMessage>
              Active Now
            </LastMessage>
          </Ree>
          <div>
            <Link to={`/video/${this.props.location.state.pairedSlug}`}>
                <img src={video} alt="Video Call"></img>
            </Link>
          </div>
        </Content>
        <div>
          {
            this.props.location
            && this.state.userId
            && this.state.list 
            && this.state.list.map((message, index) => (
              <Messages 
                key={index}
                {...message}
                id={index}
                userData={this.props.location.state}
                user1={this.state.userId}
                user2={this.props.location.state.pairedId}
              />
            ))
          }
        </div>
        <Chat>
          <Div8>
            <Input type="text" id="usr" placeholder="Send a Message" 
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={this.state.message}
            />
          </Div8>
          <Div2>
            <ButtonA
              onClick={this.handleSend}
            >
              Send
            </ButtonA>
          </Div2>
        </Chat>
      </AuthorizedLayout>
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
  width: 18%;
  margin: 4%;
  display: inline-block;
`;

const Div8 = styled.div`
  width: 80%;
  display: inline-block;
`;

const LastMessage = styled.div`
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
