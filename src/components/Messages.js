
import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class Messages extends Component {
  render() {
    return (
      <div>
        {this.props.userData.pairedId === this.props.userId && (
          <Div>
            <Div2>
              <Img src={this.props.userData.pairedImage} alt={this.props.userData.pairedId}/>
            </Div2>
            <Div3>
              <div>
                <MessageContent>{this.props.message.content}</MessageContent>
              </div>
            </Div3>
          </Div>
        )}
        {this.props.userId === this.props.store.userStore.profile_id && (
          <DivContent>
            <Div4>
              <div>
                <MessageContent>{this.props.message.content}</MessageContent>
              </div>
            </Div4>
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

const Div3 = styled.div`
  width: 80%;
  display: inline-block;
  text-align: right;
  background-color: #191919;
  border-radius: 10px;
`;

const Div4 = styled.div`
  width: 80%;
  display: inline-block;
  text-align: left;
  margin: 10px 0px;
  border-radius: 10px;
`;

const DivContent = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  max-width: 40px;
  width: 100%;
  height: auto;
  border-radius: 50%;
`;

const Div2 = styled.div`
  width: 18%;
  margin: 4%;
  display: inline-block;
`;

const MessageContent = styled.span`
    background-color: #FC3F73;
    padding: 10px;
    
`
