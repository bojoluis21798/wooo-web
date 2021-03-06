import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import styled, { css } from 'styled-components'
import left from '../assets/icons/left.svg'
import right from '../assets/icons/right.svg'
import Loading from './Loading'
import axios from 'axios'
import AuthorizedLayout from '../layouts/AuthorizedLayout'
import matchingData from '../assets/data/matching.data'
import MatchingHeader from '../components/MatchingHeader'
import MatchingFooter from '../components/MatchingFooter'
import MatchSwipe from '../components/MatchSwipe';
import NoMatches from '../components/NoMatches';
import dog from '../assets/images/dog.jpeg'

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
            show:this.props.store.userStore.isMatched
        }
    }

    componentDidMount() {
        this.getProspects()
    }

    repopulatePhotos = () => {
        let photos = []

        let urls = [
            this.props.store.userStore.currentProspect.profile_image,
            this.props.store.userStore.currentProspect.supporting_pic_1,
            this.props.store.userStore.currentProspect.supporting_pic_2,
            this.props.store.userStore.currentProspect.supporting_pic_3,
            this.props.store.userStore.currentProspect.supporting_pic_4
        ]

        if(urls[0]){
            photos.push(urls[0])
        }

        for(let i = 1; i < 5; i++){
            if(urls[i]){
                photos.push(process.env.REACT_APP_MEDIA_BASEURL + urls[i])
            }
        }

        if(photos.length === 0) {
            photos.push(dog)
        }

        this.setState({
            photos: photos,
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
            if(res.data.match_exists){

                this.props.store.userStore.setIsMatched(true);
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
            this.nextPerson();
        }, 2000);
    }

    closeModal = () =>{
        this.setState({modalIsOpen: false});
    }

    getProspects = ()=>{
         this.props.store.userStore.getLocation(() => {
            axios.get(`${process.env.REACT_APP_API_BASEURL}/matching`,{
                 params:{
                    profile_id:this.props.store.userStore.profile_id,
                    lat: this.props.store.userStore.location.lat,
                    lng: this.props.store.userStore.location.lng,
                 }
            }).then(
                 res=>{
                     if(res.data.length === 0){
                        this.props.store.userStore.setNoProspects(true);
                        this.setState({hasPayload:true})//used to take away the loading screen

                     }else{
                        this.props.store.userStore.setProspects(res.data)
                        this.repopulatePhotos()
                        this.setState({hasPayload:true})
                     }
             })
        })
    }

    render() {
        if(!this.state.hasPayload){
            return <Loading message="Finding Gorls"/>
        }

        return (
            <AuthorizedLayout
                noheaders={true}
                noPad={true}
                black={true}
            >
                <Container>

                    <MatchingHeader
                        eventHandle = {this.handleCloseProfile}
                        type = {this.state.viewProfile ? "exit" : "back"}
                    />
                        { this.props.store.userStore.noProspectsValue &&
                            <NoMatches/>
                        }
                        <MatchSwipe
                            show={this.props.store.userStore.isMatchedValue}
                            id={this.props.store.userStore.currentProspect.id}
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
                                <ImageStyle src={this.state.photos[this.state.imgIdx]} />
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
                                        {
                                            this.props.store.userStore.currentProspect &&
                                            this.props.store.userStore.currentProspect.user &&
                                            this.props.store.userStore.currentProspect.user.first_name?
                                            this.props.store.userStore.currentProspect.user.first_name
                                            :""
                                        }
                                    </TextDiv>
                                    <TextDiv level= "2">{this.props.store.userStore.currentProspect.location}</TextDiv>
                                </BioRow>
                                <BioRow>
                                    <TextDiv level = "3">{this.props.store.userStore.currentProspect && this.props.store.userStore.currentProspect.bio?this.props.store.userStore.currentProspect.bio:""}</TextDiv>
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
    margin-bottom: 12px
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
                case "2":
                    return(
                        css`
                            font-size:2.7svh
                            font-weight: 300
                        `
                    )
                case "3":
                    return(
                        css`
                            font-size:2.7vh
                            font-weight: 300
                        `
                    )
                default:
                    return(
                        css`
                            font-size:2.7vh
                            font-weight: 300
                        `
                    )
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
    height: 6vh;
    width: 100%;
    color: #000000;
    border-width: 0px;

    &:first-child {
        margin-right: 25px;
    }
    &:nth-child(3) {
        margin-left: 25px;
    }
`
