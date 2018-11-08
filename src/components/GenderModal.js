/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global styled */

import React, {Component} from "react";
import Popup from "reactjs-popup";
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

@observer
@inject('store')
class Gender extends Component {
    constructor(props) {
        super(props)
        this.state = { open: true }
        this.handleMale = this.handleMale.bind(this)
        this.handleFemale = this.handleFemale.bind(this)

    }
    
    handleMale = (e) => {
        this.props.store.userStore.setGender(0)
        this.props.store.userStore.handleSubmit()
        this.setState({open: false})
    }

     handleFemale = (e) => {
        this.props.store.userStore.setGender(1)
        this.props.store.userStore.handleSubmit()
        this.setState({open: false})
    }
    render(){
        return (
            <Popup open={this.state.open} modal>
                <ModalContent>
                    <Title>Select your gender:</Title>
                    <Male type="button" onClick={this.handleMale} value="Male"/>
                    <Female type="button" onClick={this.handleFemale} value="Female"/>
                </ModalContent>
            </Popup>
        );
    }
};

export default Gender;


const ModalContent = styled.div`
    width: 100%;
    padding: 10px 5px;
    text-align: center;
`;

const Title = styled.h3`
    color: black;
`;

const Male = styled.input`
    font-family: 'Apercu';;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 17px;
    color: #f51a63;
    letter-spacing: 0.01px;
    text-align: center;
    border-radius: 29px;
    border-style:solid;
    border-weight:1px;
    border-color:black;
    padding-left:7vh;
    padding-right:7vh;
    padding-top:3vh;
    padding-bottom:3vh;
    margin: auto;
    margin-bottom: 5px;
    background-color:white;
`;

const Female = styled.input`
    padding-left:7vh;
    padding-right:7vh;
    padding-top:3vh;
    padding-bottom:3vh;
    font-family: 'Apercu';;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 17px;
    color:white;
    letter-spacing: 0.01px;
    text-align: center;
    background-color: #f51a63;
    border-radius: 29px;
    padding-left:7vh;
    padding-right:7vh;
    padding-top:3vh;
    padding-bottom:3vh;
    margin: auto;
    display: block;
    margin-bottom: 5px;
    border:0;
`;