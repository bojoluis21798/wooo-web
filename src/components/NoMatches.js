import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { inject, observer } from 'mobx-react'


@observer
@inject('store')
export default class NoMatches extends Component{

    render(){
        if(this.props.noProspects){
            return (
              <Container>
                <NoMatch>
                    No Matches!
                </NoMatch>
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
    grid-template-rows: 25% 100px 25% auto;
`
const NoMatch = styled.p`
    font-size: 9vh
    font-family: Apercu
    font-weight: 700
    z-index:10;
`
