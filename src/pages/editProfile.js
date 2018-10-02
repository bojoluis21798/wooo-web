import React, {Component} from 'react'
import styled from "styled-components"
import heart from "../assets/icons/heart.svg"
import alarm from "../assets/icons/alarm.png"
import chat from "../assets/icons/chat.png"
import user from "../assets/icons/user.png"
import { inject, observer } from 'mobx-react';
import { ToastContainer } from "react-toastify"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import axios from 'axios'
import ImageUploader from 'react-images-upload'


@inject('store') @observer
class editProfile extends Component {
  constructor(props) {
    super(props);
    this.state ={
      file:null,
      pictures: []
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.onDrop = this.onDrop.bind(this)
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
    const token = this.props.store.userStore.token;
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            Authorization: 'Token ' + token,
            
        }
    }
    return axios.post(url, formData, config)
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    })
  }

    render(){
        return (
            <ProfileScreen>
            <ToastContainer />
            <ProfileContent>
              <Header>
                {/* <Icon><img src="../assests/icons/heartfill.png" alt="my image" onclick={this.myfunction} /></Icon> */}
                <Icon id="matching" aria-label="heart" data={heart} onClick={this.myfunction} />
                <Icon2 id="notification" aria-label="alarm" data={alarm} onClick={this.myfunction1} />
                <Icon2 id="chat" aria-label="chat" data={chat} onClick={this.myfunction2} />
                <Icon2 id="profile" aria-label="user" data={user} onClick={this.myfunction3} />
                <form onSubmit={this.onFormSubmit}>
                  <Tagline>Photos</Tagline>
                  <ProfileImage>
                    <ProfileImageMain id="profilePic"/>
                    {/* <ProfileImageMain alt='Profile' src={this.props.store.userStore.profilePicture} />  */}
                    <ProfileImageSet>
                      <ImageUpBox>
                        <ImageUploader imgExtension={['.jpg', '.gif', '.png']} id="image1" withPreview={true} withIcon={false} withLabel={false} onChange={this.onDrop}/>
                      </ImageUpBox>
                      <Image2 id="image2" type="file" onChange={this.UploadFile} />
                      <Image3 id="image3" type="file" onChange={this.UploadFile} />
                      <Image4 id="image4" type="file" onChange={this.UploadFile} />
                    </ProfileImageSet>
                  </ProfileImage>
                  <Tagline>Bio</Tagline>
                  <BioText id="bio" type="text" name="bio" onChange={this.handleChange} />
                  <Tagline>Preference</Tagline>
                  <PrefButton id="opposite" aria-label="Opposite" onClick={this.Opposite}>Opposite</PrefButton>
                  <PrefButton id="same" aria-label="Same" onClick={this.Same}>Same</PrefButton>
                  <PrefButton id="both" aria-label="Both" onClick={this.Both}>Both</PrefButton>
                  <Tagline>Radius</Tagline>
                  <Slider id="radius" min={1} max={10} />
                  {/* <button type="submit">Click here</button> */}
                </form>
              </Header>
            </ProfileContent>
          </ProfileScreen>
        )
    }
}
const ProfileScreen = styled.div`
  position: relative
  height: 100vh
  background-color: #111111
  overflow: auto
  overflow-x: hidden
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
  min-width:30%
  height:100vh
`
const Icon = styled.object`
  width: 40px
  height: 40px
  margin: auto
  margin-right: 120px
  margin-bottom: 20px
`
const Icon2 = styled.object`
  width: 50px
  margin: auto
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
  boder: none
  float: left

  &:hover {
    cursor: pointer
    background-position: 300px
    background-color:  #191919
    border: 1px solid #f51a63
  }
  &:focus {
    outline: none !important
    border: 1px solid #f51a63 !important
  }
`
const ProfileImageSet = styled.div`
  width: 50%
  height: 100%
  float: right
`
const ImageUpBox = styled.div`

`
// const ImageUploader = styled.button`
//   width: 45%
//   height: 48%
//   background-color: #fff
//   border-radius: 5px
//   margin: auto
//   margin-left: 3%
//   float: right

//   &:hover {
//     cursor: pointer
//     background-position: 300px
//     background-color:  #191919
//     border: 1px solid #f51a63
//   }
//   &:focus {
//     outline: none !important
//     border: 1px solid #f51a63 !important
//   }
// `
const Image2 = styled.div`
  width: 45%
  height: 48%
  background-color: #191919
  border-radius: 5px
  margin: auto
  margin-right: 3%
  float: right

  &:hover {
    cursor: pointer
    background-position: 300px
    background-color:  #191919
    border: 1px solid #f51a63
  }
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
  margin: auto
  margin-top: 5%
  margin-left: 3%
  float: right

  &:hover {
    cursor: pointer
    background-position: 300px
    background-color:  #191919
    border: 1px solid #f51a63
  }
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
  margin: auto
  margin-top: 5%
  margin-right: 3%
  float: right

  &:hover {
    cursor: pointer
    background-position: 300px
    background-color:  #191919
    border: 1px solid #f51a63
  }
  &:focus {
    outline: none !important
    border: 1px solid #f51a63 !important
  }
`
const BioText = styled.textarea`
  height: 90px
  max-height: 150px
  min-height: 90px
  width: 100%
  max-width: 335px
  min-width: 335px
  font-weight: 20
  font-size: 12px
  color: #ffffff
  background-color: #191919
  border-radius: 5px
  border: none
  justify-items: center
  padding-top: 7px
  padding-bottom: 7px
  overflow: hidden
  resize: hidden

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