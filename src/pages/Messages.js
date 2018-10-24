import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import styled from "styled-components";
import MessageItems from '../components/MessageItems'
import axios from 'axios';
import AuthorizedLayout from '../layouts/AuthorizedLayout';
import firebase from 'firebase';

@inject('store') 
@observer
export default class Messages extends Component {
  state = {
    currentUser: this.props.store.userStore.profile_id,
    pairedUser: null,
  };

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_BASEURL}/profiles/${this.props.store.userStore.profile_id}/matches`)
    .then(response => {
      if(response.data){
        var pairedUser = [];
        response.data.forEach(element => {
          console.log(element);
          var pairedInfo = {
            pairedId: element.id,
            pairedName: element.user.first_name,
            pairedSlug: element.user.slug,
            pairedBio: element.bio,
            pairedImage: element.profile_image,
            roomId: this.state.currentUser+'R'+element.id,
            message: ""
          }
          pairedInfo.roomId = (element.id < this.state.currentUser) ? element.id+'R'+this.state.currentUser : this.state.currentUser+'R'+element.id

          firebase.database().ref().child('roomData/'+pairedInfo.roomId).limitToLast(1).on('value', message => {
              var lastmessage = Object.values(message.val());
              pairedInfo.message = lastmessage[0].message.content;
            })
          pairedUser.push(pairedInfo);
        })
        this.setState({
          pairedUser
        })
      }
    })
  }

  render() {
    return (
      <AuthorizedLayout noverflow={true}>
        <Content>
          <Tag>
            <PageTitle>Messages</PageTitle>
          </Tag>
          <Search>
            <Input type="text" id="usr" placeholder="Search for a message"/>
          </Search>
          <MessageItems pairedUser={this.state.pairedUser} />
        </Content>
      </AuthorizedLayout>
    );
  }
}

const PageTitle = styled.div`
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 20px;
`

const Content = styled.div`
`

const Tag = styled.div`
  text-align: left;
`;

const Search = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 15px;
  color: #ffffff;
  padding: 15px 15px;
  background-color: #191919;
  border-radius: 5px;
  border: none;
  justify-items: center;
  overflow: hidden;
  resize: hidden;
  margin-bottom: 5px;
  border: 1px solid #191919;
  
  &:focus {
    outline: none !important;
  }
`;
  