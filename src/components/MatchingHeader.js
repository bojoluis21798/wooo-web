import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'
import back from '../assets/icons/circled-back.svg'
import close from '../assets/icons/close-button.svg'

export default class HeaderArea extends Component {
    goBack = () =>{
       return <Redirect to='/dashboard'/>
    }

    render() {
        if(this.props.type === 'back') {
            return(
                <BackArea type = {this.props.type} >
                 <Link to='/dashboard'>
                    <TopButton>
                        <Icon src={this.props.type === "back" ? back : close}/>
                    </TopButton>
                 </Link>
                </BackArea>
            );
        } else {
            return(
                <BackArea type = {this.props.type} >
                    <TopButton onClick = {this.props.eventHandle}>
                        <Icon src={this.props.type === "back" ? back : close}/>
                    </TopButton>
                </BackArea>
            );
        }
    }
}

const BackArea = styled.div`
    flex-basis: min-content;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content:
    ${
        props => {
            if(props.type === "back"){
                return ("flex-start");
            }else if(props.type === "exit"){
                return ("flex-end");
            }
        }
    };
`;

const TopButton = styled.button`
    border: none;
    text-align: center;
    background-color: transparent;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    margin: 3vh;
    padding: 0vh;
`;

const Icon = styled.img``
