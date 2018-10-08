import React,{Component} from 'react';
// import './matchingUI.css';
import {inject,observer} from 'mobx-react';
import back from '../assets/images/back-button.png';
import close from '../assets/images/close-button.png';
import dislike from '../assets/images/dislike.png';
import dog from '../assets/images/dog.jpeg';
import dog2 from '../assets/images/dog2.jpg';
import dog3 from '../assets/images/dog3.jpg';
import heart from '../assets/images/heart-outline.png';

import styled, {css,keyframes}from 'styled-components';
import left from '../assets/images/left.png';
import right from '../assets/images/right.png';
import Notifications, {notify} from 'react-notify-toast';
import Loading from './Loading';
import axios from 'axios';

const Container = styled.div`
    display: flex;
    float: left;
    height:100%;
    width: 100%;
    flex-direction: column;
    align-items:center;
    background-color: black;
`;

const BackArea = styled.div`
    flex-basis: min-content;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content:
    ${
        props => {
            if(props.type == "back"){
                return ("flex-start");
            }else if(props.type == "exit"){
                return ("flex-end");
            }
        }
    };
`;

const TopButton = styled.button`
    border: none;
    text-align: center;
    background-color:black;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    margin: 3vh;
`;

const Icon = styled.img`
    width:5vh;
    height:5vh;
`;

const Profile = styled.div`
    display: flex;
    flex-basis: min-content;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin-left: 3vh;
    margin-right: 3vh;
`;

const PicArea = styled.div`
    flex-basis: min-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const ImageStyle = styled.img`
    width:40vh;
    height:40vh;
    border-radius:20px;
`;

const MainTextArea = styled.div`
    flex-basis: min-content;
    width: 100%;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BioRow = styled.div`
    display: flex;
    padding-top: 3.5vh;
    padding-bottom: 3.5vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const TextDiv = styled.div`
    text-align:center;
    color: white;
    font-family: 'Roboto', sans-serif;
    ${
        props => {
            switch(props.level){
                case "1":
                    return(
                        css`
                            font-size:4vh;
                            font-weight: 500;
                        `
                    );
                case "2":
                    return(
                        css`
                            font-size:2.7svh;
                            font-weight: 300;
                        `
                    );
                case "3":
                    return(
                        css`
                            font-size:2.7vh;
                            font-weight: 300;
                        `
                    );
            }
        }
    }
`;

const ButtonActions = styled.button`
    border-radius: 100%;
    background-color: rgba(18, 18, 18, 1); /* Green */
    border: none;
    color: white;
    padding: 3vh;
    margin: 3.5vh;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
`;

const ButtonArea = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0;
    justify-content: center;
    display:flex;
    flex-direction:row;
`;

const Item = styled.div`
    align-self: center;
`;

const PicSlide = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-basis: max-content;
`;

const Arrow = styled.button`
    background: url(
        ${props=>
            props.direction == "left" ?
                left: right
    }) no-repeat scroll 0 0 transparent;
    background-size: contain;
    width: 6vh;
    height: 6vh;
    color: #000000;
    border-width: 0px;
`;



class FooterArea extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            
            <ButtonArea>
                <Item>
                    <ButtonActions onClick = {this.props.handleDislike}>
                        <Icon src={dislike}/>
                    </ButtonActions>
                </Item>
                <Item>
                    <ButtonActions onClick = {this.props.handleLike}>
                        <Icon src={heart}/>
                    </ButtonActions>
                </Item>
            </ButtonArea>
        );
    }
}

class HeaderArea extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <BackArea type = {this.props.type}>
                <TopButton onClick = {this.props.eventHandle}>
                    <Icon src={this.props.type == "back" ? back : close}/>
                </TopButton>
            </BackArea>
        );
    }
}

@inject('store')@observer
class Matching extends Component{

    constructor(props){
        super(props);

        this.state = {
            hasPayload : false,
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
            viewProfile: false,
            imgIdx: 0,
        };

        
        this.nextPerson = this.nextPerson.bind(this);
        this.handleDislike = this.handleDislike.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleViewProfile = this.handleViewProfile.bind(this);
        this.handleCloseProfile = this.handleCloseProfile.bind(this);
        this.handleNextPic = this.handleNextPic.bind(this);
        this.handlePreviousPic = this.handlePreviousPic.bind(this);
    }

    componentDidMount(){
        /*this.changeSmth();*/

        axios.get("https://wooo.philsony.com/api/matching").then(
            res=>{
                console.log(res);
            }
        );
        setTimeout(() => {
            this.setState({hasPayload:true});
        }, 5000);
    }

    nextPerson(){
        if(this.state.people.length > 1){
            this.setState(prev =>
                {
                    prev.people.splice(0,1);
                    return {people: prev.people};
                }
            );
        }
    }

    handleDislike(){
        this.nextPerson();
    }

    handleLike(){
        notify.show('Toasty!');
        this.nextPerson();
    }

    handleViewProfile(){
        this.setState({
            viewProfile: true,
        });
    }

    handleCloseProfile(){
        this.setState({
            viewProfile: false,
            imgIdx: 0,
        });
    }

    handleNextPic(imgLength){
        this.setState({
            imgIdx: (this.state.imgIdx+1)%imgLength,
        });
    }

    handlePreviousPic(imgLength){
        let imgIdx = this.state.imgIdx;
        this.setState({
            imgIdx: (imgIdx-1 == -1) ? imgLength-1: imgIdx-1,
        });
    }
    render(){
        const store = this.props.store;

        // const list = store.arr.map(num=>{
        //     return <li>{num}</li>
        // });

        // //OR
        // console.log(store.users);
        // const list = store.arr.map((num,index)=>(
        //     <li key={index}>{num}</li>
        // ));
        // const anotherList = store.users.map((object,index)=>(
        //     <li>{object.firstName}</li>
        // ));
        let state = this.state;
        let currentPerson = state.people[0];
        let imgIdx = state.imgIdx;
        console.log(imgIdx);

        if(!this.state.hasPayload){

            
            return <Loading message="Finding Gorls"/>
        }
        return (
            <Container>
                <Notifications/>
                <HeaderArea
                    eventHandle = {this.handleCloseProfile}
                    type = {state.viewProfile ? "exit" : "back"}/>
                <Profile onClick = {this.handleViewProfile}>
                    <PicSlide>
                        {state.viewProfile &&
                            <Arrow
                                onClick = {e => this.handlePreviousPic(currentPerson.img.length, e)}
                                direction = "left"
                            />
                        }
                        <PicArea>
                            <ImageStyle src={currentPerson.img[imgIdx]} />
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
                                <TextDiv level = "1">{currentPerson.name}, {currentPerson.age}</TextDiv>
                                <TextDiv level= "2">{currentPerson.location}</TextDiv>
                            </BioRow>
                            <BioRow>
                                <TextDiv level = "3">{currentPerson.bio}</TextDiv>
                            </BioRow>
                        </TextContainer>
                    </MainTextArea>
                </Profile>
            {!state.viewProfile &&
                <FooterArea
                    handleLike = {this.handleLike}
                    handleDislike = {this.handleDislike}
                />
            }
            </Container>
        );
    }

    //  changeSmth = ()=>{
    //     // this.props.store.add();
    //     this.props.store.fetchUsers();
    // }
}

export default Matching;
