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
            photos: [],
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

    componentDidMount() {
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
                    this.repopulatePhotos()
                    this.setState({hasPayload:true})
                 }


             }
         )
    }

    repopulatePhotos = () => {
        this.setState({
            photos: [
                this.props.store.userStore.currentProspect.profile_image,
                // supporting images here
            ]
        })
    }

    nextPerson = () => {
        if(this.props.store.userStore.prospectLength > 1){
            this.props.store.userStore.nextProspect()
        }else{
            this.setState({hasPayload:false});
            this.getProspects();
        }
        this.repopulatePhotos()
    }

    handleDislike = () => {
        const config ={
            headers:{
                Authorization:'Token '+ this.props.store.userStore.token
            }
        }
        axios.post(`${process.env.REACT_APP_API_BASEURL}/matching/`, {
                profile_id:this.props.store.userStore.profile_id,
                match_id:this.props.store.userStore.currentProspect.id,
                status:0
        }, config).then(res=>{
            this.nextPerson();
        });
    }

    handleLike = () => {
        const config ={
            headers:{
                Authorization:'Token '+ this.props.store.userStore.token
            }
        }
        axios.post(`${process.env.REACT_APP_API_BASEURL}/matching/`, {
                profile_id: this.props.store.userStore.profile_id,
                match_id:this.props.store.userStore.currentProspect.id,
                status: 1
        }, config).then(res=>{
            console.log("RESPONSE IS HERE");
            console.log(res);
            console.log(res.data.match_exists);
            if(res.data.match_exists){

                this.props.store.userStore.setIsMatched(true);
                console.log(this.props.store.userStore.isMatched);
                this.setState({show:this.props.store.userStore.isMatched});
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

    handleNextPic = () => {
        this.setState({
            imgIdx: (this.state.imgIdx+1)%this.state.photos.length,
        })
    }

    handlePreviousPic = () => {
        this.setState({
            imgIdx: (this.state.imgIdx-1 === -1) ? this.state.photos.length-1: this.state.imgIdx-1,
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
         console.log("FML");
         console.log(this.props.store.userStore.profile_id);
         axios.get("https://wooo.philsony.com/api/matching",{
             params:{
                 profile_id:this.props.store.userStore.profile_id
             }
         }).then(
             res=>{
                 console.log("getProspects response here");
                 console.log(res);

                 if(res.data.length == 0){
                     console.log("res.data.length == 0");
                    this.props.store.userStore.setNoProspects(true);
                    console.log(this.props.store.userStore.noProspects);
                    this.setState({hasPayload:true});//used to remove the loading
                 }else{

                    this.props.store.userStore.setProspects(res.data);
                    this.setState({hasPayload:true});
                    this.props.store.userStore.setNoProspects(false);
                 }



             }
         );
    }

    render() {
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
                        type = {this.state.viewProfile ? "exit" : "back"}
                    />

                        <NoMatches noProspects={this.props.store.userStore.noProspectsValue}>

                        </NoMatches>

                        <MatchSwipe
                            show={this.props.store.userStore.isMatchedValue}
                            eventHandle={this.nextPerson}
                        />

                        <Profile onClick = {this.handleViewProfile}>

                        <PicSlide>
                            {this.state.viewProfile &&
                                <Arrow
                                    onClick = {this.handlePreviousPic}
                                    direction = "left"
                                />
                            }
                            <PicArea>
                                <ImageStyle src={this.state.photos[0]?this.state.photos[this.state.imgIdx]:this.state.people[0].img[this.state.imgIdx]} />
                            </PicArea>
                            {this.state.viewProfile &&
                                <Arrow
                                    onClick = {this.handleNextPic}
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
                                            :this.state.people[0].name
                                        }
                                        ,
                                        {
                                            this.props.store.userStore.currentProspect.age?
                                            this.props.store.userStore.currentProspect.age:this.state.people[0].age
                                        }
                                    </TextDiv>
                                    <TextDiv level= "2">{this.state.people[0].location}</TextDiv>
                                </BioRow>
                                <BioRow>
                                    <TextDiv level = "3">{this.props.store.userStore.currentProspect.bio?this.props.store.userStore.currentProspect.bio:this.state.people[0].bio}</TextDiv>
                                </BioRow>
                            </TextContainer>
                        </MainTextArea>
                        </Profile>

                    {
                        !this.state.viewProfile &&
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
