import React, { Component } from 'react';
import MessageHead from '../messageHead/main';
import { inject, observer } from 'mobx-react';
import styled from "styled-components";
import axios from 'axios';
import _ from 'lodash';

@inject('store') @observer
export class Messages extends Component {
  state = {
    currentUser: this.props.store.userStore.profile_id,
    pairedUser: [],
  };

  MessageItems = () => {
    axios.get(`https://wooo.philsony.com/api/profiles/${this.props.store.userStore.profile_id}/matches`)
    .then(response => {
      console.log(response);
      if(response.data){
        var pairedUser = [];
        response.data.forEach(element => {
          var pairedInfo = {
            pairedId: element.id,
            pairedName: element.user.first_name,
            pairedImage: element.profile_image,
            roomId: this.state.currentUser+'R'+element.id,
          }
          pairedInfo.roomId = (element.id < this.state.currentUser) ? element.id+'R'+this.state.currentUser : this.state.currentUser+'R'+element.id
          pairedUser.push(pairedInfo);
        });
        this.setState({
          pairedUser,
        })
      }
    })
    const matches= this.state.pairedUser;
    const items = [];

  _.mapKeys(matches, (data, index) => {
    items.push(
      <div key={index}>
        <MessageHead
          {...data}
        />
        <hr/>
      </div>,
    );
  });

  return items;
  };
  render() {
    return (
      <div>
        <Tag>
          <h2><strong>Messages</strong></h2>
        </Tag>
        <Search>
          <Input type="text" id="usr" placeholder="Search for a message"/>
        </Search>
        <div>
          {this.MessageItems()}
        </div>
      </div>
    );
  }
}

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