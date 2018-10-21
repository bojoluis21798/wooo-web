import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from "styled-components";

@inject('store') @observer
export default class Messages extends Component {
  render() {
    return (
      <div>
        {this.props.profile_id !== this.props.store.userStore.profile_id && (
          <Div>
            <Div2>
              <Img src={this.props.userData.pairedImage} alt={this.props.userData.pairedId}/>
            </Div2>
            <Div3>
              <div>
                <p>{this.props.message.content}</p>
              </div>
            </Div3>
          </Div>
        )}
        {this.props.profile_id === this.props.store.userStore.profile_id && (
          <DivContent>
            <Div3>
              <div>
                <p>{this.props.message.content}</p>
              </div>
            </Div3>
            <Div2>
              <Img src={this.props.store.userStore.profilePicture} alt={this.props.profile_id}/>
            </Div2>
          </DivContent>
        )}
      </div>
    );
  }
}


const Div = styled.div`
  display: flex;
  align-items: center;
`;

const Div2 = styled.div`
  width: 20%;
  display: inline-block;
`;

const Div3 = styled.div`
  width: 80%;
  display: inline-block;
  text-align: left;
  margin: 3px;
  padding: 1px;
  padding-left: 5px;
  background-color: #191919;
  border-radius: 10px;
`;

<<<<<<< HEAD
=======
const Div4 = styled.div`
  width: 80%;
  display: inline-block;
  text-align: left;
  margin: 3px;
  padding: 1px;
  padding-left: 5px;
  background-color: #FC3F73;
  border-radius: 10px;
`;

>>>>>>> f52e39ee4e43fab37c4f714a39387a537237a0c7
const DivContent = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 50%;
`;