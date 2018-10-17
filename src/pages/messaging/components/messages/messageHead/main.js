import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './main.css';
import '../../../global/global.css'

export class MessageHead extends Component {
  reroute = () => {
  };
  render() {
    const img = require('../../../imgs/'+this.props.img);
    return (
      <div onClick={this.reroute}>
        <Link to={{ pathname: `/messages/${this.props.id}`, state: this.props }} className="link">
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