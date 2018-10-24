
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class Messages extends Component {

  render() {
    return this.props.userData.pairedId === this.props.userId? 
      <SenderMessage>
        <MessageContent>{this.props.message.content}</MessageContent>
        <Img src={this.props.userData.pairedImage} alt={this.props.profile_id}/>
      </SenderMessage> : 
      <MyMessage>
        <MessageContent selfsent={true}>You: {this.props.message.content}</MessageContent>
      </MyMessage>
      
  }
}

const MyMessage = styled.div`
  display: grid;
  padding: 6px;
`

const SenderMessage = styled.div`
  display: grid;
  grid-template-columns: 1fr 40px;
  grid-column-gap: 10px;
  padding: 6px;
  justify-items: right;
`

const Img = styled.img`
  max-width: 40px;
  width: 100%;
  height: auto;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
`;

const MessageContent = styled.span`
    background-color: #FC3F73;
    padding: 10px;
    width: fit-content;
    border-radius: 5px;
    margin-bottom: 2px;
    max-width: 250px;
    line-height: 22px;

    ${
      props => props.selfsent && css`
        background-color: #121212
      `
    }
`
