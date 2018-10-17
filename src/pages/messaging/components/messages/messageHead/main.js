import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './main.css';
import '../../../global/global.css'

export default class MessageHead extends Component {
  reroute = () => {
    console.log(this.props.users);
  };
  render() {
    const img = require(this.props.pairedImage);
    return (
      <div onClick={this.reroute}>
        <Link to={{ pathname: `/messages/${this.props.id}`, state: this.props }} className="link">
          <div className="content">
            <div className="div-3">
              <img src={img} alt={this.props.name}/>
            </div>
            <div  className="div-7 details">
              <div className="name">
                <strong>{this.props.pairedName}</strong>
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