import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import styled, { css } from 'styled-components'
import left from '../assets/images/left.png'
import right from '../assets/images/right.png'
import Notifications, {notify} from 'react-notify-toast'
import Loading from './Loading'
import axios from 'axios'
import AuthorizedLayout from '../layouts/AuthorizedLayout'
import matchingData from '../assets/data/matching.data'
import MatchingHeader from '../components/MatchingHeader'
import MatchingFooter from '../components/MatchingFooter'
import MatchSwipe from '../components/MatchSwipe';
import dog from '../assets/images/dog.jpeg';
import dog2 from '../assets/images/dog2.jpg';
import dog3 from '../assets/images/dog3.jpg';
import NoMatches from '../components/NoMatches';


@inject('store')
@observer
export default class Matching extends Component{
    constructor(props){
        super(props)
        this.state = {
            hasPayload : false,
            people: matchingData,
            viewProfile: false,
            imgIdx: 0,
            noProspects: false,
            modalIsOpen: false,
            people: [
                {
                    name: "Rico",
                    age: 16,
                    img: [dog, dog2, dog3],
                    location: "DOWNTOWN MANHATTAN, NEW YORK",
                    bio: "My friends call me daddy. I can't figure out why. Do you mind helping me figure it out?",
                },
                {
                    name: "Rob",
                    age: 17,
                    img: [dog2, dog, dog3],
                    location: "DOWNTOWN MANHATTAN, NEW YORK",
                    bio: "Im chinese",
                },
                {
                    name: "Joe",
                    age: 17,
                    img: [dog3, dog, dog2],
                    location: "DOWNTOWN MANHATTAN, NEW YORK",
                    bio: "Im white",
                }
            ],
            show:this.props.store.userStore.isMatched
        }
    }
    
    componentDidMount = () => {
         axios.get(`${process.env.REACT_APP_API_BASEURL}/matching`,{
             params:{
                 profile_id:this.props.store.userStore.profile_id
             }
         }).then(
             res=>{
                 console.log(res)
                 if(res.data.length === 0){
                    this.props.store.userStore.setNoProspects(true);
                    this.setState({hasPayload:true})//used to take away the loading screen
                    
                 }else{
                    this.props.store.userStore.setProspects(res.data)
                    this.setState({hasPayload:true})
                 }


             }
         )
    }

    nextPerson = () => {
        if(this.props.store.userStore.prospectLength > 1){
            this.props.store.userStore.nextProspect()
        }else{
            this.setState({hasPayload:false});
            this.getProspects();
        }

    }

    handleDislike = () => {
        const store = this.props.store.userStore;
        const config ={
            headers:{
                Authorization:'Token '+ this.props.store.userStore.token
            }
        }
        axios.post(`${process.env.REACT_APP_API_BASEURL}/matching/`, {
                profile_id:store.profile_id,
                match_id:store.currentProspect.id,
                status:0
        }, config).then(res=>{
            this.nextPerson();
        });
    }

    handleLike = () => {
        const store = this.props.store.userStore;
        const config ={
            headers:{
                Authorization:'Token '+ this.props.store.userStore.token
            }
        }
        axios.post(`${process.env.REACT_APP_API_BASEURL}/matching/`, {
                profile_id: store.profile_id,
                match_id:store.currentProspect.id,
                status: 1
        }, config).then(res=>{
            console.log("RESPONSE IS HERE");
            console.log(res);
            console.log(res.data.match_exists);
            if(res.data.match_exists){

                store.setIsMatched(true);
                console.log(store.isMatched);
                this.setState({show:store.isMatched});
            }else{
                this.nextPerson();
            }


        })
    }

    handleViewProfile = () => {
        this.setState({
            viewProfile: true,
        })
    }

    handleCloseProfile = () => {
            this.setState({
                viewProfile: false,
                imgIdx: 0,
            })
    }

    handleNextPic = imgLength => {
        this.setState({
            imgIdx: (this.state.imgIdx+1)%imgLength,
        })
    }

    handlePreviousPic = imgLength => {
        let imgIdx = this.state.imgIdx
        this.setState({
            imgIdx: (imgIdx-1 === -1) ? imgLength-1: imgIdx-1,
        })
    }

    openModal = () =>{
        this.setState({modalIsOpen: true});
    }

    afterOpenModal = ()=>{
        setTimeout(() => {
            this.closeModal();
            console.log("nextPerson was called");
            this.nextPerson();
        }, 2000);
    }

    closeModal = () =>{
        this.setState({modalIsOpen: false});
    }

    getProspects = ()=>{
        const store = this.props.store.userStore;

         console.log("FML");
         console.log(store.profile_id);
         axios.get("https://wooo.philsony.com/api/matching",{
             params:{
                 profile_id:store.profile_id
             }
         }).then(
             res=>{
                 console.log("getProspects response here");
                 console.log(res);

                 if(res.data.length == 0){
                     console.log("res.data.length == 0");
                    store.setNoProspects(true);
                    console.log(store.noProspects);
                    this.setState({hasPayload:true});//used to remove the loading
                 }else{

                    store.setProspects(res.data);
                    this.setState({hasPayload:true});
                    store.setNoProspects(false);
                 }



             }
         );
    }

    render() {
        let state = this.state
        let currentPerson = state.people[0]
        let imgIdx = state.imgIdx

        if(!this.state.hasPayload){
            return <Loading message="Finding Gorls"/>
        }
        return (
            <AuthorizedLayout
                noheaders={true}
                noPad={true}
            >
                <Container>
                    <Notifications/>
                    <MatchingHeader
                        eventHandle = {this.handleCloseProfile}
                        type = {state.viewProfile ? "exit" : "back"}
                    />

                        <NoMatches noProspects={this.props.store.userStore.noProspectsValue}>

                        </NoMatches>

                        <MatchSwipe show={this.props.store.userStore.isMatchedValue}/>

                        <Profile onClick = {this.handleViewProfile}>

                        <PicSlide>
                            {state.viewProfile &&
                                <Arrow
                                    onClick = {e => this.handlePreviousPic(currentPerson.img.length, e)}
                                    direction = "left"
                                />
                            }
                            <PicArea>
                                <ImageStyle src={this.props.store.userStore.currentProspect.profile_image?this.props.store.userStore.currentProspect.profile_image:currentPerson.img[imgIdx]} />
                            </PicArea>
                            {state.viewProfile &&
                                <Arrow
                                    onClick = {e => this.handleNextPic(currentPerson.img.length, e)}
                                    direction = "right"
                                />
                            }
                        </PicSlide>
                        <MainTextArea>
                            <TextContainer>
                                <BioRow>
                                    <TextDiv level = "1">
                                        { this.props.store.userStore.currentProspect.user.first_name?
                                            this.props.store.userStore.currentProspect.user.first_name
                                            :currentPerson.name
                                        }
                                        ,
                                        {
                                            this.props.store.userStore.currentProspect.age?
                                            this.props.store.userStore.currentProspect.age:currentPerson.age
                                        }
                                    </TextDiv>
                                    <TextDiv level= "2">{currentPerson.location}</TextDiv>
                                </BioRow>
                                <BioRow>
                                    <TextDiv level = "3">{this.props.store.userStore.currentProspect.bio?this.props.store.userStore.currentProspect.bio:currentPerson.bio}</TextDiv>
                                </BioRow>
                            </TextContainer>
                        </MainTextArea>
                        </Profile>

                    {
                        !state.viewProfile &&
                        <MatchingFooter
                            handleLike = {this.handleLike}
                            handleDislike = {this.handleDislike}
                        />
                    }
                </Container>
            </AuthorizedLayout>
        )
    }
}

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       :'transparent'
    }
  };

const Container = styled.div`
    display: flex
    float: left
    height:100%
    width: 100%
    flex-direction: column
    align-items:center
`

const Profile = styled.div`
    display: flex
    width: 100%
    flex-basis: min-content
    justify-content: space-between
    align-items: center
    flex-direction: column
`

const PicArea = styled.div`
    flex-basis: min-content
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
`

const ImageStyle = styled.img`
    width:40vh
    height:40vh
    border-radius:20px
`

const MainTextArea = styled.div`
    flex-basis: min-content
    width: 100%
    display:flex
    flex-direction: row
    justify-content: center
    align-items: center
`

const TextContainer = styled.div`
    display: flex
    flex-direction: column
    align-items: center
`

const BioRow = styled.div`
    display: flex
    padding: 2.5vh
    flex-direction: column
    align-items: center
    justify-content: space-between
`

const TextDiv = styled.div`
    text-align:center;
    color: white;
    font-family: 'Apercu', sans-serif;
    ${
        props => {
            switch(props.level){
                case "1":
                    return(
                        css`
                            font-size:3.5vh
                            font-weight: 500
                        `
                    )
                    break;
                case "2":
                    return(
                        css`
                            font-size:2.7svh
                            font-weight: 300
                        `
                    )
                    break;
                case "3":
                    return(
                        css`
                            font-size:2.7vh
                            font-weight: 300
                        `
                    )
                    break;
                default:
                    return(
                        css`
                            font-size:2.7vh
                            font-weight: 300
                        `
                    )
                    break;
            }
        }
    }
`

const PicSlide = styled.div`
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    flex-basis: max-content
`

const Arrow = styled.button`
    background: url(
        ${props=>
            props.direction === "left" ?
                left: right
    }) no-repeat scroll 0 0 transparent
    background-size: contain
    width: 6vh
    height: 6vh
    color: #000000
    border-width: 0px
`

const NoMatch = styled.p`
    font-size: 9vh
    font-family: Apercu
    font-weight: 700
`
