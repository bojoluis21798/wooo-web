import React, {Component} from 'react'
import styled from "styled-components"
import heart from "../assets/icons/heart.svg"
import alarm from "../assets/icons/alarm.png"
import chat from "../assets/icons/chat.png"
import user from "../assets/icons/user.png"
// import AuthorizedLayout from '../layouts/AuthorizedLayout';
import { inject, observer } from 'mobx-react';
import { ToastContainer } from "react-toastify"

@inject('store') @observer
class Profile extends Component {
    render(){
        return (
            // <AuthorizedLayout>
            <ProfileScreen>
            <ToastContainer />
            <ProfileContent>
              <Header>
                <Icon aria-label="heart" data={heart} />
                <Icon2 aria-label="alarm" data={alarm} />
                <Icon2 aria-label="chat" data={chat} />
                <Icon2 aria-label="user" data={user} />
                <Tagline>Photos</Tagline>
                <Tagline>Bio</Tagline>
                <BioText type="text" name="bio" />
                {/* <BioText /> */}
                <Tagline>Preference</Tagline>
                <PrefButton>Opposite</PrefButton>
                <PrefButton>Both</PrefButton>
                <Tagline>Radius</Tagline>
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
  width: 90vw
  margin: auto
`
const Icon = styled.object`
  width: 40px
  margin-right: 120px
  margin-bottom: 30px
`
const Icon2 = styled.object`
  width: 50px
  margin-left: 20px
  margin-bottom: 30px
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
const BioText = styled.input`
  height: 70px
  width: 100%
  background-color: #191919
  border-radius: 5px
  border: 0
  justify-items: center
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
  width: 100px
  margin: auto
  margin-bottom: 5px
  margin-right: 15px
  transition: 0.5s all ease

  &:hover {
    cursor: pointer
    background-position: 300px
    background-color: #f51a63
  }
`

export default Profile