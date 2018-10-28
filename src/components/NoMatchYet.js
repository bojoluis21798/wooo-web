import React,{Component} from 'react';
import { inject, observer } from "mobx-react";
import styled from 'styled-components'

@inject("store")
@observer
export default class NoMatchYet extends Component{
    render(){
        return (
            <Container>
                <Text>You haven't found a match yet,would you like to find one?</Text>
                <div><Button></Button></div>
            </Container>
        );
    }
}


const Container = styled.div`
    display:grid;
    grid-template-columns:[first-line] 100% [second-line]
`
const Text = styled.div `
    text-align:center;
    font-size:4vh;
    font-color:white;
    justify-self: center;
    grid-column-start: 1
    grid-column-end: 2
    grid-row-start: auto
    grid-row-end:  auto
`

const Button = styled.button`
    background-color:pink; /* Green */
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 4vh;
    cursor: pointer;
    border-radius:12px;
    margin:auto;
    padding-top:20px;
    padding-bottom:20px;
    padding-left:50px;
    padding-right:50px;
`
