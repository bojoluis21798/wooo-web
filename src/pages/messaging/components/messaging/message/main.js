import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Messages from '../messages/main';
import back from '../../../../../assets/images/left.png';
import './main.css';
import '../../../global/global.css';
import _ from 'lodash';

const roomData = {
	roomId: 1,
	messages: [{
    profile_id: 14,
    img: "00.jpg",
		message: {
			type: "String",
			content: "REEE MOFO"
		},
		time: "IDK IF WANT",
	},{
    profile_id: 2,
    img: "01.jpg",
		message: {
			type: "Image",
			content: "IDK WHAT IT LOOKS LIKE (link maybe?)"
		},
		time: "IDK IF WANT",
	},{
    profile_id: 14,
    img: "00.jpg",
		message: {
			type: "String",
			content: "U STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHATU STUPID IDK WHAT"
		},
		time: "IDK IF WANT",
	},]
}

export default class MessageBody extends Component {
  state ={
    roomData,
  }

  componentDidMount(){
  }

  MessageItems = () => {
    const posts = this.state.roomData.messages;
    const items = [];

    _.mapKeys(posts, (data, index) => {
      items.push(
          <Messages
            {...data}
            key={index}
            id={index}
            userData={this.props.ree}
          />,
      );
    });

    return items;
  };
  render() {
    return (
      <div>
        <div className="content">
          <div className="back">
            <Link to='/' className="link">
              <img src={back} alt="Back"></img>
            </Link>
          </div>
          <div className="ree">
            <div className="name">
              <strong>{this.props.ree.pairedName}</strong>
            </div>
            <div className="last-message">
              <p>Active Now</p>
            </div>
          </div>
        </div>
        <div className="Messages">
          {this.MessageItems()}
        </div>
        <div className="search form-control">
          <div className="div-8">
            <input type="text" className="form-control" id="usr" placeholder="Send a Message"/>
          </div>
          <div className="div-2">
            <button className="button">SEND</button>
          </div>
        </div>
      </div>
    );
  }
}