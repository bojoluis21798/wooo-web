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
  state = {
    message: '',
    loading: true  
  }

  componentDidMount() {
    this.messageRef = firebase.database().ref().child('roomData/'+this.props.location.state.roomId);
    this.setState({ loading: false })
    this.subscribeToMessages()
  }

  static getDerivedStateFromProps(nextProps) {
    return nextProps.user? ({ userId: nextProps.user.displayId }): nextProps;
  }
  
  handleSend = () => {
    var newmessage = {
      userId: this.props.store.userStore.profile_id,
      message: {
        type: "String",
        content: this.state.message
      }
    }
    this.messageRef.push(newmessage);
    this.setState({ message: '' });
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') this.handleSend();
  }
  
  handleChange = event => this.setState({message: event.target.value});

  subscribeToMessages = () => {
      this.messageRef
      .limitToLast(9)
      .on('value', message => {
          if(!this.state.loading) 
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

const MessageList = styled.div`
  margin-top: 20px;  
`

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
