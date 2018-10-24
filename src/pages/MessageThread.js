import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import back from '../assets/images/left.png';
import { inject, observer } from 'mobx-react';
import firebase from 'firebase';
import AuthorizedLayout from '../layouts/AuthorizedLayout';

const config =  {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DBURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID
};
  
firebase.initializeApp(config);

export default class MessageThread extends Component {
  state = {
    location: this.props.location.state,
  };

  render() {
    return (
      <MessageBody ree={this.state.location}/>
    );
  }
}

@inject('store') 
@observer
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

  componentDidMount() {
    this.setState({message: ""});
    this.setState({userId: this.props.store.userStore.profile_id});
    this.handleMessageListen();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.user? ({ userId: nextProps.user.displayId }): ({});
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
              <strong>{this.props.ree.pairedName}</strong>
            </Name>
            <LastMessage>
              <p>Active Now</p>
            </LastMessage>
          </Ree>
        </Content>
        <div>
          {
            this.state.list && this.state.list.map((message, index) => (
              <Messages 
                key={index}
                {...message}
                id={index}
                userData={this.props.ree}
                user1={this.state.userId}
                user2={this.props.ree.pairedId}
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
