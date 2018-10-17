import React, { Component } from 'react';
import './main.css';
import {MessageBody} from '../message/main';


export class Messaging extends Component {
  componentDidMount(){
    console.log(this.props.name)
  }
  render() {
    return (
      <div>
        <MessageBody props={this.props}/>
      </div>
    );
  }
}