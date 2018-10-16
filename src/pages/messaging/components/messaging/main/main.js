import React, { Component } from 'react';
import './main.css';
import {MessageBody} from '../message/message_body/MessageBody';

export class Messaging extends Component {
  render() {
    return (
      <div>
        <MessageBody roomID={this.props.roomID}/>
      </div>
    );
  }
}