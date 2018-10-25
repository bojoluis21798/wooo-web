import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { inject, observer } from 'mobx-react'


@observer
@inject('store')
export default class NoMatches extends Component{

    render(){
        if(this.props.store.userStore.noProspectsValue){
            return (
                <NoMatch>
                    No Matches!
                </NoMatch>
            );
        }else{
            return null;
        }
    }

    
}



const NoMatch = styled.p`
    font-size: 9vh
    font-family: Apercu
    font-weight: 700
    z-index:10;
`
