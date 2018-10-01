import React, {Component} from 'react'
import styled from "styled-components"
import heart from "../assets/icons/heart.svg"
import alarm from "../assets/icons/alarm.png"
import chat from "../assets/icons/chat.png"
import user from "../assets/icons/user.png"
// import editP from "../assets/icons/edit.png"
// import AuthorizedLayout from '../layouts/AuthorizedLayout';
import { inject, observer } from 'mobx-react';
import { ToastContainer } from "react-toastify"
import Slider from "rc-slider"
import 'rc-slider/assets/index.css';



@inject('store') @observer
class editProfile extends Component {

  myfunction(){
    console.log("Like!");
  }

  myfunction1(){
    console.log("Ring!");
  }

  myfunction2(){
    console.log("Hello!");
  }

  myfunction3(){
    console.log("Weiner!");
  }

  Opposite(){
    console.log("Girl Boy!");
  }

  Same(){
    console.log("Girl Girl Boy Boy");
  }

  Both(){
    console.log("Both!");
  }

    render(){
        return (
            // <AuthorizedLayout>
            <ProfileScreen>
            <ToastContainer />
            <ProfileContent>
              <Header>
                {/* <Icon><img src="../assests/icons/heartfill.png" alt="my image" onclick={this.myfunction} /></Icon> */}
                <Icon aria-label="heart" data={heart} onClick={this.myfunction} />
                <Icon2 aria-label="alarm" data={alarm} onClick={this.myfunction1} />
                <Icon2 aria-label="chat" data={chat} onClick={this.myfunction2} />
                <Icon2 aria-label="user" data={user} onClick={this.myfunction3} />
                <Tagline>Photos</Tagline>

                <ProfileImage>
                  <ProfileImageMain/>
                  <ProfileImageSet>
                    <Image1/>
                    <Image2/>
                    <Image3/>
                    <Image4/>
                  </ProfileImageSet>
                </ProfileImage>
                <Tagline>Bio</Tagline>
                <BioText type="text" name="bio" />
                {/* <form>
                  <textarea value={this.state.value} onChange={this.handleChange} />
                </form> */}
                {/* <BioText /> */}
                <Tagline>Preference</Tagline>
                  <PrefButton aria-label="Opposite" onClick={this.Opposite}>Opposite</PrefButton>
                  <PrefButton aria-label="Same" onClick={this.Same}>Same</PrefButton>
                  <PrefButton aria-label="Both" onClick={this.Both}>Both</PrefButton>
                <Tagline>Radius</Tagline>
                <Slider min={1} max={10} defaultValue={5} />
              </Header>
            </ProfileContent>
          </ProfileScreen>
            // </AuthorizedLayout>
        )
    }
}

const ProfileScreen = styled.div`
  position: relative
  height: 100vh
  background-color: #111111
`
const ProfileContent = styled.div`
  display: grid
  justify-items: center
  grid-template-rows: 2fr 3fr 1fr
  height: 100vh
  z-index: 1
`
const Header = styled.div`
  margin: auto
`
const Icon = styled.object`
  width: 40px
  height: 40px
  margin-right: 120px
  margin-bottom: 20px
`
const Icon2 = styled.object`
  width: 50px
  margin-left: 8px
  margin-bottom: 20px
  margin-top: 10px
`
// const Icon3 = styled.object`
//   width: 18px
//   display: block
//   float: right
// `
const Tagline = styled.div`
  width: 100%
  font-weight: 500
  color: #f3f3f3    
  font-size: 18px
  max-width: 250px
  display: block
  margin-bottom: 20px
  margin-top: 20px
`
const ProfileImage = styled.div`
  height: 150px
  width: 100%
  border-radius: 5px
`
const ProfileImageMain = styled.div`
  width: 49%
  height: 100%
  background-color: #191919
  border-radius: 5px
  float: left
`
const ProfileImageSet = styled.div`
  width: 48%
  height: 100%
  float: right
`

const Image1 = styled.div`
  width: 45%
  height: 48%
  background-color: #191919
  border-radius: 5px
  margin-left: 3%
  float: right
`
const Image2 = styled.div`
  width: 45%
  height: 48%
  background-color: #191919
  border-radius: 5px
  margin-right: 3%
  float: right
`
const Image3 = styled.div`
  width: 45%
  height: 48%
  background-color: #191919
  border-radius: 5px
  margin-top: 5%
  margin-left: 3%
  float: right
`
const Image4 = styled.div`
  width: 45%
  height: 48%
  background-color: #191919
  border-radius: 5px
  margin-top: 5%
  margin-right: 3%
  float: right
`
const BioText = styled.input`
  height: 50px
  width:100%
  font-weight: 20
  font-size: 12px
  color: #ffffff
  background-color: #191919
  border-radius: 5px
  border: none
  justify-items: center
  word-wrap: break-word

  textarea:focus, input:focus{
    border-color: pink
  }
`
const PrefButton = styled.button`
  font-weight: 100
  font-size: 15px
  color: #ffffff
  background-color: #191919
  letter-spacing: 0.01px
  text-align: center
  border-radius: 5px
  border: 0
  padding: 12px
  width: 90px
  margin: auto
  margin-bottom: 5px
  margin-right: 15px
  transition: 0.5s all ease

  &:hover {
    cursor: pointer
    background-position: 300px
    background-color:  #191919
    border: 1px solid #f51a63
  }
`

export default editProfile