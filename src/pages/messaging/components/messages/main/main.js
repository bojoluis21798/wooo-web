import React, { Component } from 'react';
import MessageHead from '../messageHead/main';
import { inject, observer } from 'mobx-react';
import './main.css';
import axios from 'axios';
import _ from 'lodash';

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
    roomData,
  };

  MessageItems = () => {
    const posts= this.state.roomData;
    const items = [];

    _.mapKeys(posts, (data, index) => {
      items.push(
        <div key={index} class='chat_item'>
          <MessageHead
            {...data}
            id={index}
          />
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
    })
    console.log("REEEE");
    console.log(this.props.store.userStore.profile_id);
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
      </div>
    );
  }
}