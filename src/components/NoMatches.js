import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import brokenHeart from '../assets/icons/brokenHeart.svg'

@observer
@inject('store')
export default class NoMatches extends Component{

    render(){
        return (
            <Container>
                    <BrokenHeart data={brokenHeart}/>
                    <LargeText>We have no available potential matches for you at the moment.</LargeText>
            </Container>
        );
    }


}


const Container = styled.div`
    position: absolute; /* Sit on top of the page content */
    width: 100%; /* Full width (cover the whole page) */
    height: auto; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 40% 50%;
    grid-row-gap: 2vh;
    background-color: #000000; /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
    margin-top:10vh;
    justify-items: center;
    align-items: center;
`

const BrokenHeart = styled.object`
    align-self: end;
`

const LargeText = styled.div`
    color:white;
    font-size: 20px;
    line-height: 30px;
    max-width: 300px;
    text-align:center;
    margin: 2vh;
    align-self:start;
    display: grid;
`

