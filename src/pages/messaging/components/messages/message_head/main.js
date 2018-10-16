import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ree from '../../../imgs/00.jpg';
import './main.css';
import '../../../global/global.css'

export class MessageHead extends Component {
  reroute = () => {
    console.log("Hello");
  };
  render() {
    const img = require('../../../imgs/'+this.props.img);
    return (
      <div onClick={this.reroute}>
        <Link to={`/message/${this.props.id}`} className="link">
          <div className="content">
            <div className="div-3">
              <img src={img} alt={this.props.name}/>
            </div>
            <div  className="div-7 details">
              <div className="name">
                <strong>{this.props.name}</strong>
              </div>
              <br />
              <div className="last-message">
                <p>{this.props.message}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}