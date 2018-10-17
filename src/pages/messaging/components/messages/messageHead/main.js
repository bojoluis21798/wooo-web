import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './main.css';
import '../../../global/global.css'

export default class MessageHead extends Component {
  render() {
    return (
      <div onClick={this.reroute}>
        <Link to={{ pathname: `/messages/${this.props.id}`, state: this.props }} className="link">
          <div className="content">
            <div className="div-3">
              <img src={this.props.pairedImage} alt={this.props.name}/>
            </div>
            <div className="div-7 details">
              <div className="name">
                <strong>
                  {this.props.pairedName}
                </strong>
              </div>
              <div>
                <p className="last-message">
                  {this.props.pairedName}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}