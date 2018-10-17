import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './main.css';
import '../../../global/global.css';


@inject('store') @observer
export default class Messages extends Component {
  
  render() {
    const img = require('../../../imgs/'+this.props.img);
    return (
      <div>
        <div className="content">
            <div className="div-3">
              <img src={img} alt={this.props.profile_id}/>
            </div>
            <div  className="div-7 details">
              <div className="message">
                <p>{this.props.message.content}</p>
              </div>
            </div>
          </div>
      </div>
    );
  }
}