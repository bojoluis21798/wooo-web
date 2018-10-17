import React, { Component } from 'react';
import './main.css';
import {MessageBody} from '../message/main';

export class Messaging extends Component {
  state = {
    props: this.props.location.state,
  };

  componentDidMount(){
    console.log("MAIN");
    console.log(this.state.props.name);
  }
  render() {
    return (
      <div>
        <MessageBody/>
      </div>
    );
  }
}