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

@observer
@inject('store')
export default class Matching extends Component{
    constructor(props){
        super(props)
        this.state = {
            hasPayload : false,
            people: matchingData,
            viewProfile: false,
            imgIdx: 0,
            noProspects: false,
        }
    }

    componentDidMount = () => {
         axios.get("https://wooo.philsony.com/api/matching",{
             params:{
                 profile_id:this.props.store.userStore.profile_id
             }
         }).then(
             res=>{
                 if(res.data.length === 0){
                    this.setState({noProspects: true})
                 }else{
                    this.props.store.userStore.setProspects(res.data)
                 }
                 this.setState({hasPayload:true})

             }
         )
    }

    nextPerson = () => {
        this.props.store.userStore.nextProspect()
    }

    handleDislike = () => {
        const config ={
            headers:{
                Authorization:'Token '+ this.props.store.userStore.token
            }
        }
        axios.post("https://wooo.philsony.com/api/matching/",{
                profile_id:this.props.store.userStore.profile_id,
                match_id:this.props.store.userStore.currentProspect.id,
                status:0
        },config).then(res=>{
        })
        this.nextPerson()
    }

    handleLike = () => {
        const config ={
            headers:{
                Authorization:'Token '+ this.props.store.userStore.token
            }
        }
        axios.post("https://wooo.philsony.com/api/matching/", {
                profile_id: this.props.store.userStore.token.profile_id,
                match_id: this.props.store.userStore.token.currentProspect.id,
                status: 1
        }, config).then(res=>{
            let matchExists = res.match_exists !== undefined
            if(matchExists){
                notify.show("You matched!", "success", 4000)
            }
        })
        this.nextPerson()
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

    render() {
        let state = this.state
        let currentPerson = state.people[0]
        let imgIdx = state.imgIdx

        if(!this.state.hasPayload){
            return <Loading message="Finding Gorls"/>
        }
        return (
            <AuthorizedLayout noheaders={true}>
                <Container>
                    <Notifications/>
                    <MatchingHeader
                        eventHandle = {this.handleCloseProfile}
                        type = {state.viewProfile ? "exit" : "back"}
                    />
                    {this.state.noProspects ?
                        <NoMatch>
                            No Match
                        </NoMatch>
                        :
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
                    }
                    {
                        !state.noProspects &&
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
    position: absolute
    float: left
    height:100%
    width: 100%
    flex-direction: column
    align-items:center
    background-color: black
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
    text-align:center
    color: white
    font-family: 'Apercu', sans-serif
    ${
        props => {
            switch(props.level){
                case "1":
                    return(
                        css`
                            font-size:4vh
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
