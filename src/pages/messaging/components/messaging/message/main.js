import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import back from '../../../../../assets/images/left.png';
import './main.css';
import '../../../global/global.css';

export class MessageBody extends Component {
  return = () => {
    console.log("Hello");
  };

  componentDidMount(){
    console.log(this.props.name)
  }
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
              <strong>{this.props.name}</strong>
            </div>
            <div className="last-message">
              <p>Active Now</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}