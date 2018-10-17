import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
export class message_db extends Component {
  state = {
    currentUser: this.props.store.userStore.profile_id,
    pairedUsers:[],
  };

  componentDidMount(){
    console.log("MAIN");
    console.log(this.state.props.name);
  }

  render() {
    return (
      <div>
        {this.state.currentUser}
      </div>
    );
  }
}