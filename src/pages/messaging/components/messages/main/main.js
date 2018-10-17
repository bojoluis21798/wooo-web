import React, { Component } from 'react';
import MessageHead from '../messageHead/main';
import { inject, observer } from 'mobx-react';
import './main.css';
import axios from 'axios';
import _ from 'lodash';

import {MessageBody} from '../../messaging/messageRee/message_body/MessageBody'

const roomData = [{
    img: "00.jpg",
    name: "Sausage Cate",
    message: "You! Yes, you! You wanna see some powerful dank memes?",
  },{
    img: "01.jpg",
    name: "Shepherd Frog",
    message: "Bork! Bork! Mofo",
  },{
    img: "02.jpg",
    name: "Multi Insect",
    message: "Godbless America and all its citizens!",
}];

@inject('store') @observer
export class Messages extends Component {
  state = {
    currentUser: this.props.store.userStore.profile_id,
    pairedUser: [],
    roomData: roomData
  };

  MessageItems = () => {
    const posts= this.state.roomData;
    const items = [];

    _.mapKeys(posts, (data, index) => {
      items.push(
        <div key={index}>
          <MessageHead
            {...data}
            id={"16R14"}
          />
          <hr/>
        </div>,
      );
    });

    return items;
  };
  componentDidMount(){
    axios.get(`https://wooo.philsony.com/api/profiles/${this.props.store.userStore.profile_id}/matches`)
    .then(response => {
      console.log(response);
      console.log("Get was Successful!");
      
      var roomIds = new Array();
      var PairedUser = new Array();
      response.data.forEach(element => {
        var pairedInfo = {
          pairedId: element.id,
          pairedName: element.user.first_name,
          pairedImage: element.profile_image
        }
        roomIds.push(this.state.currentUser+'R'+element.id);
        PairedUser.push(pairedInfo);
      });
      this.state.pairedUser = PairedUser;
    })
  }
  render() {
    return (
      <div>
        <div className="tag">
          <h2><strong>Messages</strong></h2>
        </div>
        <div className="search">
          <input type="text" className="form-control" id="usr" placeholder="Search for a message"/>
        </div>
        <div>
          {this.MessageItems()}
        </div>
      <MessageBody />
      </div>
    );
  }
}