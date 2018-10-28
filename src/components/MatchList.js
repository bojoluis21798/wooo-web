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
                    <div><Link to='/matching'><Button>Start Swiping ></Button></Link></div>
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
    display:grid;
    grid-template-columns:[first-line] 100% [second-line]
    grid-template-rows:[row-one] 50% [row-two] 50% [row-three]
`
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

const Text = styled.div `

    height:250px;
    text-align:center;
    font-size:4vh;
    font-color:white;
    justify-self:center;
    align-self: end;
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
    font-size: 2vh;
    cursor: pointer;
    border-radius:12px;
    margin:auto;
    padding-top:20px;
    padding-bottom:20px;
    padding-left:50px;
    padding-right:50px;
`
