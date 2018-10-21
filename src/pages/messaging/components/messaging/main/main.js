import React, { Component } from 'react';
import MessageBody from '../message/main';

export class Messaging extends Component {
  state = {
    props: this.props.location.state,
  };

  componentDidMount(){
    
  }

  render() {
    return (
      <div>
        <MessageBody ree={this.state.props}/>
      </div>
    );
  }
}