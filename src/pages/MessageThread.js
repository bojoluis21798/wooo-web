import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import back from '../assets/icons/back.svg'
import video from '../assets/icons/videocall.svg'
import send from '../assets/icons/send.svg'
import online from '../assets/icons/online.svg'
import { inject, observer } from 'mobx-react'
import firebase from 'firebase'
import AuthorizedLayout from '../layouts/AuthorizedLayout'
import Messages from '../components/Messages'
import Rebase from 're-base'
import { animateScroll } from 'react-scroll'

const base = Rebase.createClass(firebase.database());
@inject('store') @observer
export default class MessageThread extends Component {
  state = {
    messageDetail: { },
    message: "", 
    userId: this.props.store.userStore.profile_id,
    status: "",
    list: []
  }
  informStore = () => {
    this.props.store.messageStore.setCurrentThread(this.props.location.state.roomId)
    this.props.store.messageStore.setPairName(this.props.location.state.pairedName)
    this.props.store.messageStore.setPairSlug(this.props.location.state.pairedSlug)
    this.props.store.messageStore.setPairImage(this.props.location.state.pairedImage)
    this.props.store.messageStore.setThreadPageState(this.props.location.state)
    
    console.log("REEEE: ", this.props.location.state);
  }

  componentDidMount() {
    if(this.props.location.state){
      this.informStore();
    }
    this.initialize();
  }

  initialize = () => {
    this.messageReff = firebase.database().ref().child('roomData/'+this.props.store.messageStore.threadPageState.roomId);
    this.messageRef = base.syncState('roomData/'+this.props.store.messageStore.threadPageState.roomId,{
      context: this,
      state:'messageDetail'
    });
    this.setState({userId: this.props.store.userStore.profile_id});
    this.subscribeToMessages();
    this.userStatus();
  }

  componentWillUnmount() {
    base.removeBinding(this.messageRef);
    this.subscribeToMessages = null;
    this.userStatus = null;
  }

  static getDerivedStateFromProps(nextProps) {
    return nextProps.user? ({ userId: nextProps.user.displayId }): nextProps;
  }
  
  handleChange = event => {
    this.setState({message:event.target.value});
  }

  handleSend = (message) => {
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
    this.subscribeToMessages();
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') this.handleSend();
  }
  
  handleVideo = () => {
    var videoURL = this.props.store.messageStore.threadPageState.pairedName + " called you " + window.location.origin + "/video/" + this.props.store.messageStore.threadPageState.pairedSlug +" to answer.";
    let messageDet = Object.assign({}, this.state.messageDetail);
    const id = Date.now() + "" + this.state.userId;
    messageDet[id] = {
      content: videoURL,
      messageType: "Link",
      userId: this.state.userId
    }
    this.setState({messageDetail:messageDet});
  }
  subscribeToMessages = () => {
    this.messageReff
      .limitToLast(100)
      .on('value', message => {
        if(message && message.val()) 
          this.setState({
            list: Object.values(message.val()),
          });
        this.scrollToBottom()
    });
  }

  scrollToBottom = () => {
    animateScroll.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }
  
  userStatus = () => {
    this.userStatusRef = firebase.database().ref().child('users/'+this.props.store.messageStore.threadPageState.pairedId).limitToLast(1).on('value', message => {
      if(message.val()){
        this.setState({status:"Active"})
      }else{
        this.setState({status:"Offline"})
      }
    });
  }

  render() {
    return (
      <AuthorizedLayout noverflow={true} redirectTo='messages'>
        { this.state &&
          this.props.store.messageStore.threadPageState.pairedName &&
          (<MessageThreadBody>
            <Content>
                <Back>
                <Link to='/messsages'>
                    <img src={back} alt="Back"></img>
                </Link>
                </Back>
                <Ree>
                <Name>
                    {this.props.store.messageStore.threadPageState && this.props.store.messageStore.threadPageState.pairedName}
                </Name>
                <LastMessage>
                    {this.state.status !== "Active" && ("Offline")}
                    {this.state.status === "Active" && (
                      <OnlineIndicator>
                        <img src={online} alt='Online Indicator'/>
                        <span>Active Now</span>
                      </OnlineIndicator>
                    )}
                </LastMessage>
                </Ree>
                <div>
                  {this.state.status === "Active" && (
                  <Link to={`/calling/${this.props.store.messageStore.threadPageState && this.props.store.messageStore.threadPageState.pairedSlug}`}>
                      <img src={video} alt="Video Call"></img>
                  </Link>
                  )}
                </div>
            </Content>
            <MessageList>
              { this.state.list && this.state.list.length? this.state.list.map((message, index) => (
                  <Messages 
                  key={index}
                  {...message}
                  id={index}
                  userData={this.props.store.messageStore.threadPageState}
                  user1={this.props.store.userStore.profile_id}
                  user2={this.props.store.messageStore.threadPageState.pairedId}
                  />
                )): ''
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
  height: 50px;
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
  position: fixed;
  bottom: 10px;
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
  margin-bottom: 40px;
  overflow-y: scroll;

  &::-webkit-scrollbar-track  {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
    border-radius: 10px;
  }

  &::-webkit-scrollbar{
    width: 4px;
  }

  &::-webkit-scrollbar-thumb{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,.3);
    background-color: #555;
  }
`

const OnlineIndicator = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: center;
`
