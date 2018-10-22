import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default class MessageHead extends Component {
  render() {
    return (
        <Linked>
            <Link to={{ pathname: `/messages/${this.props.roomId}`, state: this.props }}>
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
            </Link>
        </Linked>
    )
  }
}


const Linked = styled.div`
    color: white !important;
    text-decoration: none;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
`;

const Image = styled.img`
min-width: 100% !important;
height: auto;
border-radius: 100%;
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
font-size: 1.5em;
`;

const LastMessage = styled.p`
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis !important;
`;
