import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default class MessageHead extends Component {
  render() {
    return (
        <Item>
            <Linked to={{ pathname: `/messages/${this.props.roomId}`, state: this.props }}>
                <Content>
                    <Div3>
                    <Image src={this.props.pairedImage} alt={this.props.name}/>
                    </Div3>
                    <Div7>
                    <Name>
                        <strong>
                        {this.props.pairedName}
                        </strong>
                    </Name>
                    <div>
                        <LastMessage>
                        {this.props.pairedName}
                        </LastMessage>
                    </div>
                    </Div7>
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
    display: flex;
    align-items: center;
`;

const Image = styled.img`
    height: auto;
    border-radius: 100%;
    width: 95px;
`;

const  Div3 = styled.div`
    flex: 1 1 !important;
    padding: 0px;
    margin: 0px;
`;

const Div7 = styled.div`
    flex: 3 3 !important;
    padding-left: 5%;
    padding-right: 5%;
    text-align: left;
    color: white !important;
    text-decoration: none;
`;

const Name = styled.div`
    font-size: 18px;
`;

const LastMessage = styled.p`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis !important;
`;
