import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './main.css';
import '../../../global/global.css';


@inject('store') @observer
export default class Messages extends Component {
  help(){
    console.log()
  }
  render() {
    return (
      <div>
        {this.props.profile_id !== this.props.store.userStore.profile_id && (
          <div className="content">
            <div className="div-2">
            <img src={this.props.userData.pairedImage} alt={this.props.userData.pairedId}/>
            </div>
            <div  className="div-8 details2">
              <div>
                <p>{this.props.message.content}</p>
              </div>
            </div>
          </div>
        )}
        {this.props.profile_id === this.props.store.userStore.profile_id && (
          <div className="content">
            <div  className="div-8 details1">
              <div>
                <p>{this.props.message.content}</p>
              </div>
            </div>
            <div className="div-2">
              <img src={this.props.store.userStore.profilePicture} alt={this.props.profile_id}/>
            </div>
          </div>
        )}
      </div>
    );
  }
}