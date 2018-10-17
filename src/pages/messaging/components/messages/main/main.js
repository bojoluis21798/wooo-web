import React, { Component } from 'react';
import MessageHead from '../messageHead/main';
import { inject, observer } from 'mobx-react';
import './main.css';
import axios from 'axios';
import _ from 'lodash';

@inject('store') @observer
export class Messages extends Component {
  state = {
    currentUser: this.props.store.userStore.profile_id,
    pairedUser: [],
  };
  
  componentDidMount(){
    
  }

  MessageItems = () => {
    axios.get(`https://wooo.philsony.com/api/profiles/${this.props.store.userStore.profile_id}/matches`)
    .then(response => {
      console.log(response);
      console.log("Get was Successful!");

      var pairedUser = [];
      response.data.forEach(element => {
        var pairedInfo = {
          pairedId: element.id,
          pairedName: element.user.first_name,
          pairedImage: element.profile_image,
          roomId: this.state.currentUser+'R'+element.id,
        }
        pairedUser.push(pairedInfo);
      });
      this.setState({
        pairedUser,
      })
    })
    const matches= this.state.pairedUser;
    const items = [];

    _.mapKeys(matches, (data, index) => {
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