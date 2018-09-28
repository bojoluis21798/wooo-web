import React, {Component} from 'react'
import styled from "styled-components"
import heart from "../assets/icons/heart.svg"
import alarm from "../assets/icons/alarm.png"
import chat from "../assets/icons/chat.png"
import user from "../assets/icons/user.png"
// import AuthorizedLayout from '../layouts/AuthorizedLayout';
import { inject, observer } from 'mobx-react';
import { ToastContainer } from "react-toastify"
// import { ReactSlider } from "react-slider"


@inject('store') @observer
class Profile extends Component {
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
                  <Image></Image>
                  <Image></Image>
                  <Image></Image>
                  <Image></Image>
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
                {/* <ReactSlider defaultValue={[0, 100]} withbars/> */}
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
  width: 140px
  height: 150px
  background-color: #191919
  border-radius: 5px
  margin: 0
`
const Image = styled.div`
  width: 60px
  height: 70px
  background-color: #191919
  border-radius: 5px
  margin: 0
`
const BioText = styled.input`
  height: 50px
  width: 320px
  font-weight: 20
  font-size: 12px
  color: #ffffff
  background-color: #191919
  border-radius: 5px
  border: none
  justify-items: center

  textarea:focus, input:focus{
    outline: #f51a63
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

export default Profile