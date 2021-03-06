import React,{Component} from 'react'
import { inject, observer } from "mobx-react"
import styled from 'styled-components'
import { Link } from 'react-router-dom'

@inject("store")
@observer
export default class MatchList extends Component{
    render(){
        if(this.props.store.userStore.matches.length !== 0 && this.props.store.userStore.matches.matches_exists !== false){
            return (
              <ContainerMain>
                { this.props.pairedUser.length && this.props.pairedUser.map((match, index) => (
                    <Person key={index}>
                        <Link to={{pathname: `/messages/${match.roomId}`, state: match }}>
                            <Image src={match.pairedImage} />
                        </Link>
                    <Name>{match.pairedName}</Name>
                </Person>
                )) }
              </ContainerMain>
            );
        }else{
            return (
                <Container>
                    <Text>You haven't found a match yet, would you like to find one?</Text>
                    <Link to='/matching'><Button>Start Swiping</Button></Link>
                </Container>
            );
        }
    }
}
const ContainerMain=styled.div`
    margin-top: 5vh;
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
    font-size: 18;
    font-color:white;
`

const Text = styled.div `
    padding-top: 3vh;
    padding-bottom: 5vh;
    text-align:center;
    font-size: 20px;
    line-height: 30px;
    max-width: 300px;
    font-color:white;
    grid-column-start: 1
    grid-column-end: 2
    grid-row-start: auto
    grid-row-end:  auto
`

const Button = styled.button`
    background-color:#F11A61;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 18px;
    cursor: pointer;
    border-radius:5px;
    margin:auto;
    padding: 15px 25px;
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
