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
                <Person>
                    <Image src={match.profile_image} />
                    <Name>{match.user.first_name}</Name>
                </Person>
            ));
        }

       
    }

}

const Person = styled.div`
    height:200px;
    margin: auto;
    
    display:grid;
`

const Image = styled.img `
    justify-self: center;
    width:17vh;
    height:17vh;
    border-radius: 11vh;
    border: none;
    margin: auto;
    padding:10px;
    padding-bottom:none;
`
const Name = styled.div `
    text-align:center;
    font-size:2vh;
    font-color:white;
`