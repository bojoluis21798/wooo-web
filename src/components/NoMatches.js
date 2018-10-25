import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { inject, observer } from 'mobx-react'
import brokenHeart from '../assets/icons/brokenHeart.svg'

@observer
@inject('store')
export default class NoMatches extends Component{

    render(){
        if(this.props.noProspects){
            return (
              <Container>
                  <IconArea>
                    <SubContainer>
                        <BrokenHeart data={brokenHeart}/>
                    </SubContainer>
                    <LargeText>We have no available potential matches for you at the moment.</LargeText>
                  </IconArea>
              </Container>
            );
        }else{
            return null;
        }
    }

    
}


const Container = styled.div`
    position: fixed; /* Sit on top of the page content */
    display:grid; /* Hidden by default */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0; 
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,1); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
    margin-top:10vh;
    grid-template-columns: 40px 50px auto 50px 40px;
    grid-template-rows: 25% 100px auto;
`
const NoMatch = styled.p`
    font-size: 9vh
    font-family: Apercu
    font-weight: 700
    z-index:10;
`
const BrokenHeart = styled.object`
    width: 50vw;
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
`
const SubContainer = styled.div`
    align-self: end;
    justify-self: center;
    grid-column-start: 1;
    grid-column-end:1;
    grid-row-start:1;
    grid-row-end:1;
`
const IconArea = styled.div`
    display:grid
    grid-template-columns: 100%;
    grid-template-rows:100%;
    grid-column-start: 3;
    grid-column-end:4;
    grid-row-start: 2;
    grid-row-end: 3;
`
const LargeText = styled.div`
    color:white;
    font-size:2vh;
    text-align:center;
`