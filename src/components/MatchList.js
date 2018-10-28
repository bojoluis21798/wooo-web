import React,{Component} from 'react';
import { inject, observer } from "mobx-react";
import styled from 'styled-components'
import { Link } from 'react-router-dom'

@inject("store")
@observer
export default class MatchList extends Component{
    render(){
        const store = this.props.store.userStore;

       console.log(store.matches);
        if(store.matches.length !== 0 && store.matches.matches_exists !== false){
            return (
              <ContainerMain>
                {
                    store.matches.map(match=>(

                        <Person key={match.id}>
                            <Link to={`/messages/${match.id}`}>
                                <Image src={match.profile_image} />
                            </Link>
                            <Name>{match.user.first_name}</Name>
                        </Person>
                    ))
                }
              </ContainerMain>
            );
        }else{
            return (
                <Container>
                    <Text>You haven't found a match yet,would you like to find one?</Text>
                    <Link to='/matching'><Button>Start Swiping ></Button></Link>
                </Container>
            );
        }


    }

}

const ContainerMain=styled.div`
    display:grid
    grid-template-columns:[first-line] 50% [second-line] 50% [second-line]
`
const Container = styled.div`
    padding-top: 20vh;
    display: grid;
    justify-items: center;
`
const Person = styled.div`
    height:200px;
    margin: auto;
    display:grid;
`

const Name = styled.div `
    text-align:center;
    font-size:2vh;
    font-color:white;
`

const Text = styled.div `
    padding-top: 3vh;
    padding-bottom: 5vh;
    text-align:center;
    font-size:3vh;
    font-color:white;
    grid-column-start: 1
    grid-column-end: 2
    grid-row-start: auto
    grid-row-end:  auto
`

const Button = styled.button`
    background-color:#F11A61; /* Green */
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 2.5vh;
    cursor: pointer;
    border-radius:12px;
    margin:auto;
    padding-top:20px;
    padding-bottom:20px;
    padding-left:50px;
    padding-right:50px;
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
