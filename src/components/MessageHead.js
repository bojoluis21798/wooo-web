import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class MessageHead extends Component {
    informStore = () => {
        this.props.store.messageStore.setCurrentThread(this.props.roomId)
        this.props.store.messageStore.setPairName(this.props.pairedName)
        this.props.store.messageStore.setPairSlug(this.props.pairedSlug)
        this.props.store.messageStore.setPairImage(this.props.pairedImage)
        this.props.store.messageStore.setThreadPageState(this.props)
    }
  
    render() {
    return (
        <Item>
            <Linked onClick={this.informStore} to={{ pathname: `/messages/${(this.props.roomId || '') }`}}>
                <Content>
                    {this.props.roomId && <Image src={this.props.pairedImage} alt={this.props.name}/> } 
                    <MessageTease>
                        <Name>
                            <strong>
                            {this.props.pairedName}
                            </strong>
                        </Name>
                        <LastMessage>
                            {this.props.message}
                        </LastMessage>
                    </MessageTease>
                </Content>
            </Linked>
        </Item>
    )
  }
}

const Item = styled.div`
    border-bottom: 1px solid #191919;
    padding: 17px 0px;
`

const Linked = styled(Link)`
    color: white;
    text-decoration: none;
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 85px 1fr;
    grid-column-gap: 30px;
    align-items: center;
    margin-top: 10px;
`;

const Image = styled.img`
    height: auto;
    border-radius: 100%;
    width: 90px;
`;

const MessageTease = styled.div`
    
`

const Name = styled.div`
    font-size: 18px;
`;

const LastMessage = styled.p`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis !important;
`;
