import React, { Component } from 'react';
import { MessageHead } from '../message_head/main';
import './main.css';
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

export class Messages extends Component {
  state = {
    roomData,
  };

  VoteItems = () => {
    const posts= this.state.roomData;
    const items = [];

    _.mapKeys(posts, (data, index) => {
      items.push(<div>
        <MessageHead
          {...data}
          id={(index)}
        /><hr/></div>,
      );
    });

    return items;
  };

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
          {this.VoteItems()}
        </div>
      </div>
    );
  }
}