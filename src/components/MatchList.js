import React,{Component} from 'react';
import { inject, observer } from "mobx-react";
import styled, { css } from 'styled-components'

@inject("store")
@observer
export default class MatchList extends Component{
    render(){
        const store = this.props.store.userStore;

       
        if(store.matches){
            return store.matches.map(match=>(
                <Person>{match.user.first_name}</Person>
            ));
        }

       
    }

}

const Person = styled.div`
    height:400px;
`
