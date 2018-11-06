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
    color: #ffffff;
    letter-spacing: 0.01px;
    text-align: center;
    background-color: blue;
    border-radius: 29px;
    border: 0;
    padding: 12px;
    width: 300px;
    margin: auto;
    display: block;
    margin-bottom: 5px;
`;

const Female = styled.input`
    font-family: 'Apercu';;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 17px;
    color: black;
    letter-spacing: 0.01px;
    text-align: center;
    background-color: pink;
    border-radius: 29px;
    border: 0;
    padding: 12px;
    width: 300px;
    margin: auto;
    display: block;
    margin-bottom: 5px;
`;


