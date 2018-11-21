import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import axios from 'axios'

@observer
@inject('store')
export default class MatchSwipe extends Component{

    state = {
        currentUser: this.props.store.userStore.profile_id,
        pairedUser: [],
        loading: true
    }

    componentDidMount(){
        axios.get(`${process.env.REACT_APP_API_BASEURL}/profiles/${this.props.id}/matches`).then((res)=>{
            this.props.store.userStore.setMatches(res.data);
            if(res.data){
                var pairedUser = [];
                res.data.forEach(element => {
                    var pairedInfo = {
                    pairedId: element.id,
                    pairedName: element.user.first_name,
                    pairedSlug: element.slug,
                    pairedBio: element.bio,
                    pairedImage: element.profile_image,
                    roomId: this.state.currentUser+'R'+element.id,
                    message: ""
                    }
                    pairedInfo.roomId = (element.id < this.state.currentUser) ? element.id+'R'+this.state.currentUser : this.state.currentUser+'R'+element.id
        
                    firebase.database().ref().child('roomData/'+pairedInfo.roomId).limitToLast(1).on('value', message => {
                    if(message.val() != null){
                        var lastmessage = Object.values(message.val());
                        pairedInfo.message = lastmessage[0].content;
                        this.setState({ pairedInfo })
                    }else{
                        pairedInfo.message = "";
                    } 
                    });
                    pairedUser.push(pairedInfo);
                    
                });
                this.setState({
                    pairedUser,
                    loading: false
                })
            }
        })
    }

    render(){
        if(this.props.show){
            return (
                <Container>
                   <LargeText>{this.props.store.userStore.currentProspect.user.first_name} likes you too!</LargeText>
                   <ButtonArea>
                     <SubContainer>
                        <Link onClick={this.showProps} to={{pathname: `/messages/${this.state.pairedUser.roomId}`, state: this.state.pairedUser }}>
                            <Button>
                                Say Hi!
                            </Button>
                        </Link>
                     </SubContainer>
                   </ButtonArea>
                   <Text onClick={this.toggle}>Continue Swiping</Text>
                </Container>
            );

        }else {
            return null;
        }
    }

    toggle = ()=>{
        this.props.store.userStore.setIsMatched(false);
        this.props.eventHandle();
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
    background-color: rgba(0,0,0,0.7); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
    margin-top:10vh;
    grid-template-columns: 40px 50px auto 50px 40px;
    grid-template-rows: 25% 100px 25% auto;
`;

const LargeText = styled.div`
    color:white;
    font-size:5vh;
    text-align:center;
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 3;
`

const ButtonArea = styled.div`
    display:grid
    grid-template-columns: 100%;
    grid-template-rows:100%;
    grid-column-start: 2;
    grid-column-end:5;
    grid-row-start: 3;
    grid-row-end: 4;
`

const Button = styled.button`
    background-color: rgba(21,21,21,1); /* Green */
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
const Text = styled.div`
    color:white;
    font-size:5vh;
    text-align:center;
    grid-column-start: 2;
    grid-column-end:5;
    grid-row-start: 4;
    grid-row-end: 5;
`

const SubContainer = styled.div`
    align-self: end;
    justify-self: center;
    grid-column-start: 1;
    grid-column-end:1;
    grid-row-start:1;
    grid-row-end:1;
`
