import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import styled from "styled-components";
import MessageItems from '../components/MessageItems'
import axios from 'axios';
import AuthorizedLayout from '../layouts/AuthorizedLayout';

@inject('store') @observer
export default class Messages extends Component {
  state = {
    currentUser: this.props.store.userStore.profile_id,
    pairedUser: [],
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
          }
          pairedInfo.roomId = (element.id < this.state.currentUser) ? element.id+'R'+this.state.currentUser : this.state.currentUser+'R'+element.id
          pairedUser.push(pairedInfo);
        });
        this.setState({
          pairedUser
        })
      }
    })
  }

  render() {
    return (
      <AuthorizedLayout>
        <Tag>
          <PageTitle>Messages</PageTitle>
        </Tag>
        <Search>
          <Input type="text" id="usr" placeholder="Search for a message"/>
        </Search>
        <MessageList>
          <MessageItems pairedUser={this.state.pairedUser} />
        </MessageList>
      </AuthorizedLayout>
    );
  }
}

const PageTitle = styled.div`
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 15px;
`

const Tag = styled.div`
  text-align: left;
`;

const Search = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  height: 45px;
  min-height: 45px;
  width: 100%;
  font-size: 16px;
  color: #ffffff;
  padding: 25px 15px;
  background-color: #191919;
  border-radius: 5px;
  border: none;
  justify-items: center;
  overflow: hidden;
  resize: hidden;
  border: 1px solid #191919;
  
  &:focus {
    outline: none !important;
  }
`;
  
const MessageList = styled.div`
  margin-top: 30px;
`
