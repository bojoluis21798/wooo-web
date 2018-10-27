import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import back from '../assets/icons/back.svg'
import video from '../assets/icons/videocall.svg'
import send from '../assets/icons/send.svg'
import { inject, observer } from 'mobx-react'
import firebase from 'firebase'
import AuthorizedLayout from '../layouts/AuthorizedLayout'
import Messages from '../components/Messages'
import Rebase from 're-base'

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DBURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

@inject('store') @observer
export default class MessageThread extends Component {
  state = {
    messageDetail: { },
    message: "", 
    userId: this.props.store.userStore.profile_id
    
  }

  componentDidMount() {
    this.messageReff = firebase.database().ref().child('roomData/'+this.props.location.state.roomId);
    this.messageRef = base.syncState('roomData/'+this.props.location.state.roomId,{
      context: this,
      state:'messageDetail'
    });
    this.setState({userId: this.props.store.userStore.profile_id});
    this.handleMessageListen();
  }

  componentWillUnmount() {
    base.removeBinding(this.messageRef);
    this.handleMessageListen = null;
  }

  static getDerivedStateFromProps(nextProps) {
    return nextProps.user? ({ userId: nextProps.user.displayId }): nextProps;
  }
  
  handleChange = event => {
    this.setState({message:event.target.value});
  }

  handleSend = () => {
    if (this.state.message) { 
      let messageDet = Object.assign({}, this.state.messageDetail);
      const id = Date.now() + "" + this.state.userId;
      messageDet[id] = {
        content: this.state.message,
        messageType: "String",
        userId: this.state.userId
      }
      this.setState({messageDetail:messageDet});
      this.setState({message:""})
    }
    this.handleMessageListen();
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') this.handleSend();
  }

  handleMessageListen = () => {
    var messg = null;
    this.messageReff
    .limitToLast(10)
    .on('value', message => {
        messg = message.val()
    });
    if(messg !== null){
        this.listenMessages()
    }
  }

  listenMessages = () => {
    this.messageReff
    .limitToLast(100)
    .on('value', message => {
        this.setState({
            list: Object.values(message.val()),
        });
    });
  }

  render() {
    return (
      <AuthorizedLayout noverflow={true} redirectTo='messages'>
        { this.state && 
          this.props.location && 
          this.props.location.state && 
          this.props.location.state.pairedName &&
          (<MessageThreadBody>
            <Content>
                <Back>
                <Link to='/messsages'>
                    <img src={back} alt="Back"></img>
                </Link>
                </Back>
                <Ree>
                <Name>
                    {this.props.location && this.props.location.state && this.props.location.state.pairedName}
                </Name>
                <LastMessage>
                    Active Now
                </LastMessage>
                </Ree>
                <div>
                <Link to={`/video/${this.props.location && this.props.location.state && this.props.location.state.pairedSlug}`}>
                    <img src={video} alt="Video Call"></img>
                </Link>
                </div>
            </Content>
            <MessageList>
              { this.state.list && this.state.list.map((message, index) => (
                  <Messages 
                  key={index}
                  {...message}
                  id={index}
                  userData={this.props.location.state}
                  user1={this.props.store.userStore.profile_id}
                  user2={this.props.location.state.pairedId}
                  />
                ))
              }
            </MessageList>
            <Chat>
              <Input type="text" id="usr" placeholder="Send a Message" 
                onKeyPress={this.handleKeyPress}
                onChange={this.handleChange}
                value={this.state.message}
              />
              <ButtonA onClick={this.handleSend}>
                <img src={send} alt="Send Icon" />
              </ButtonA>
            </Chat>
          </MessageThreadBody>)
        }
      </AuthorizedLayout>
    )
    }
  }

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr 1fr;
  margin-bottom: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Back = styled.div`
  float: left;
  color: white;
`;

const MessageThreadBody = styled.div``

const Ree = styled.div`
  margin:0 auto;
  text-align: center;
`;

const Name = styled.div`
  font-size: 1.5em;
  margin-bottom: 5px;
`;

const ButtonA = styled.button`
  text-align: right;
  cursor: pointer;
  background-color: transparent;
  border: 0;
`;

const LastMessage = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: transparent;
`;

const Chat = styled.div`
  display: grid;
  grid-template-columns: 9fr 1fr;
  font-size: 18px;
  padding: 10px;
  color: #ffffff;
  background-color: #191919;
  border-radius: 5px;
  position: absolute;
  bottom: 20px;
  left: -12px
  margin-left: 5%;
  margin-right: 5%;
  width: 90%;

  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 5px 15px;
  color: #ffffff;
  background-color: #191919;
  border: 1px solid #191919;
  
  &:focus {
    outline: none;
  }
`;

const MessageList = styled.div`
  margin-top: 30px;
  height: 72vh;
  overflow-y: scroll;

  &::-webkit-scrollbar-track  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
  }

  &::-webkit-scrollbar{
    width: 12px;
  }

  &::-webkit-scrollbar-thumb{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }
`