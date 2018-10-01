import React, {Component} from 'react'
import styled from "styled-components"
import heart from "../assets/icons/heart.svg"
import alarm from "../assets/icons/alarm.png"
import chat from "../assets/icons/chat.png"
import user from "../assets/icons/user.png"
// import AuthorizedLayout from '../layouts/AuthorizedLayout';
import { inject, observer } from 'mobx-react';
import { ToastContainer } from "react-toastify"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import axios from 'axios'


@inject('store') @observer
class editProfile extends Component {
  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
      console.log("HELLO THIS SHOULD WORK!!!!")
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const url = 'https://wooo.philsony.com/api/profiles/';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  axios.post(url, formData,config)
  }


  // myfunction(){
  //   console.log("Like!");
  // }

  // myfunction1(){
  //   console.log("Ring!");
  // }

  // myfunction2(){
  //   console.log("Hello!");
  // }

  // myfunction3(){
  //   console.log("Weiner!");
  // }

  // Opposite(){
  //   console.log("Girl Boy!");
  // }

  // Same(){
  //   console.log("Girl Girl Boy Boy");
  // }

  // Both(){
  //   console.log("Both!");
  // }

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
                <form onSubmit={this.onFormSubmit}>
                  <Tagline>Photos</Tagline>
                  <ProfileImage>
                    <ProfileImageMain/>
                    <ProfileImageSet>
                      <Image1 type="file" onChange={this.UploadFile}/>
                      <Image2 type="file" onChange={this.UploadFile} />
                      <Image3 type="file" onChange={this.UploadFile} />
                      <Image4 type="file" onChange={this.UploadFile} />
                    </ProfileImageSet>
                  </ProfileImage>
                  <Tagline>Bio</Tagline>
                  <BioText type="text" name="bio" onChange={this.handleChange} />
                  <Tagline>Preference</Tagline>
                  <PrefButton aria-label="Opposite" onClick={this.Opposite}>Opposite</PrefButton>
                  <PrefButton aria-label="Same" onClick={this.Same}>Same</PrefButton>
                  <PrefButton aria-label="Both" onClick={this.Both}>Both</PrefButton>
                  <Tagline>Radius</Tagline>
                  <Slider min={1} max={10} />\
                  <button type="submit">Click here</button>
                </form>
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
  height: 180px
  width: 100%
  border-radius: 5px
`
const ProfileImageMain = styled.div`
  width: 48%
  height: 100%
  background-color: #191919
  border-radius: 5px
  float: left
`

const ProfileImageSet = styled.div`
  width: 50%
  height: 100%
  float: right
`

const Image1 = styled.input`
  width: 45%
  height: 48%
  background-color: #fff
  border-radius: 5px
  margin-left: 3%
  float: right

  &:focus {
    outline: none !important
    border: 1px solid #f51a63 !important
  }
`
const Image2 = styled.div`
  width: 45%
  height: 48%
  background-color: #191919
  border-radius: 5px
  margin-right: 3%
  float: right

  &:focus {
    outline: none !important
    border: 1px solid #f51a63 !important
  }
`
const Image3 = styled.div`
  width: 45%
  height: 48%
  background-color: #191919
  border-radius: 5px
  margin-top: 5%
  margin-left: 3%
  float: right

  &:focus {
    outline: none !important
    border: 1px solid #f51a63 !important
  }
`
const Image4 = styled.div`
  width: 45%
  height: 48%
  background-color: #191919
  border-radius: 5px
  margin-top: 5%
  margin-right: 3%
  float: right

  &:focus {
    outline: none !important
    border: 1px solid #f51a63 !important
  }
`
const BioText = styled.textarea`
  height: 50px
  width: 320px
  font-weight: 20
  font-size: 12px
  color: #ffffff
  background-color: #191919
  border-radius: 5px
  border: none
  justify-items: center
  padding: 10px
  resize: none

  &:focus {
    outline: none !important
    border: 1px solid #f51a63 !important
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

  &:focus {
    background-position: 300px
    background-color:  #f51a63
    border: 1px solid #f51a63
  }
`

export default editProfile