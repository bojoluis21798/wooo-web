import React, { Component } from 'react'
import styled, {css} from "styled-components"
// import heart from "../assets/icons/heart.svg"
// import alarm from "../assets/icons/alarm.png"
// import chat from "../assets/icons/chat.png"
// import user from "../assets/icons/user.png"
import { inject, observer, propTypes } from 'mobx-react'
import { ToastContainer } from "react-toastify"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import axios from 'axios'
import AuthorizedLayout from '../layouts/AuthorizedLayout'

// import 1 from 'react-images-uploader'
// import ImageUploader2 from 'react-images-uploader'
// import ImageUploader3 from 'react-images-uploader'
// import ImageUploader4 from 'react-images-uploader'
// import 'react-images-uploader/styles.css'
// import {Link,Redirect} from 'react-router-dom';

@inject('store') @observer

class editProfile extends Component {

  static propTypes = {
    checked: propTypes.bool,
    onChange: propTypes.func,
  }
  
  onFormSubmit = (e) =>{
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
      console.log("HELLO THIS SHOULD WORK!!!!")
    })
  }
  onChange = (e) => {
    this.setState({file:e.target.files[0]})
  }
  // fileUpload(file){
  //   const url = 'https://wooo.philsony.com/api/profiles/';
  //   const formData = new FormData();
  //   const token = this.props.store.userStore.token;
  //   formData.append('file',file)
  //   const config = {
  //       headers: {
  //           'content-type': 'multipart/form-data',
  //           'Authorization': 'Token' + token
  //       }
  //   }
  //   return axios.post(url, formData, config)
  // }

  componentDidMount(){
    console.log("BEGINNING OF PROFILE")
  }

  handleSubmit = (e = null) => {
    if (e != null){
      e.preventDefault();
    }
    const token = this.props.store.userStore.token;
    const config = {
        headers: {
            // 'content-type': 'multipart/form-data',
            Authorization: 'Token ' + token
        }
    }
    // console.log(e)
    console.log("Axios --POST")
    console.log(this.props.store.userStore.photos[0])
    axios.put('https://wooo.philsony.com/api/profiles/'+this.props.store.userStore.profile_id+'/', {
      bio:this.props.store.userStore.biography,
      sexual_preference:this.props.store.userStore.preference,
      gay:this.props.store.userStore.gay,
      search_radius:this.props.store.userStore.radius,
      supporting_pic_1: this.props.store.userStore.photos[0]
    },config)
    .then(response => {
      console.log(response);
      console.log("PuT was Successful!");

    })
    .catch(error => {
      console.log(error);
    })
  }

  handleImageOne = (event) => {
    console.log("----BEGIN HANLDER----")
    var file = event.target.files[0];
    var path = document.getElementById('imageOne').value;
    const store = this.props.store.userStore;

    store.setPicOne(file, path)
    this.handleSubmit()
    console.log("----END HANDLER----")
  }

  handleMale = (e) => {
    const store = this.props.store.userStore;

    store.setPreference(0)
    this.handleSubmit(e)
  }

  handleFemale = (e) => {
    const store = this.props.store.userStore;

    store.setPreference(1)
    this.handleSubmit(e)
  }

  handleBoth = (e) => {
    const store = this.props.store.userStore;

    store.setPreference(2)
    this.handleSubmit(e)
  }

  handleGay = (e) => {
    const store = this.props.store.userStore;

    if(store.gay === null || store.gay === false) {
      store.setGay(true)
    } else {
      store.setGay(false)
    }

    this.handleSubmit(e)

  }

  handleSlider = (radius) => {
    const store = this.props.store.userStore;

    store.setRadius(radius);

    this.handleSubmit(null)
  }

  handleChangeBio = (e) => {

    const store = this.props.store.userStore;

    store.setBio(e.target.value);
  }

  onDrop = (photo) => {
    this.setState({
      photos: this.state.photos.concat(photo)
    })
  }

  myfunction = ()=>{
    this.props.history.push('/matching');
  }
    render(){
        return (
          <AuthorizedLayout>
          <ToastContainer />
            <ProfileContent>
                  <Tagline id="photos">Photos</Tagline>
                 {/* <form onSubmit={this.handleImage}>*/}
                  <ProfileImage>
                    <ProfileImageMain id="profilePic"/>
                    {/* <imageContainer> */}
                      <ProfileImageMain alt='Profile' src={this.props.store.userStore.profilePicture} />
                    {/* </imageContainer>  */}
                      <Image 
                        id="img1" 
                        type="button" 
                        onClick={(e) =>{this.refs.fileUploader.click();}}
                        src={this.props.store.userStore.photos[0]}
                      >
                        <input 
                          id="imageOne"
                          type="file" 
                          accept="image/*"
                          ref="fileUploader" 
                          value={this.props.store.userStore.photos[0]} 
                          style={{display:"none"}} 
                          onChange={this.handleImageOne}/>
                      </Image>
                      {/*<Image id="img2" type="button" onClick={(e) =>{this.refs.fileUploader.click();}} >
                        <input 
                          type="file" 
                          ref="fileUploader" 
                          style={{display:"none"}} 
                          onChange={this.handleImageTwo}/>
                      </Image>
                      <Image id="img3" type="button" onClick={(e) =>{this.refs.fileUploader.click();}} >
                        <input 
                          type="file" 
                          ref="fileUploader" 
                          style={{display:"none"}} 
                          onChange={this.handleImageThree}/>
                      </Image>
                      <Image id="img4" type="button" onClick={(e) =>{this.refs.fileUploader.click();}} >
                        <input 
                          type="file" 
                          ref="fileUploader" 
                          style={{display:"none"}} 
                          onChange={this.handleImageFour}/>
                      </Image>*/}
                    <ProfileImageSet>
                      {/* <Image1 type="button" onClick={(e) =>{this.refs.fileUploader.click();}} >
                        <input type="file" ref="fileUploader" style={{display:"none"}} onChange={this.handleImage}/>
                      </Image1> */}
                      {/*<Image2 type="button"/>
                      <Image3 type="button"/>
                      <Image4 type="button"/>*/}
                    </ProfileImageSet> 
                  </ProfileImage>
                  {/*</form>*/}
                  <Tagline>Bio</Tagline>
                  <BioText
                    id="bio"
                    name="bio"
                    value={this.props.store.userStore.biography}
                    onChange={this.handleChangeBio}
                    onBlur={this.handleSubmit}
                  />
                  <Tagline>Preference</Tagline>
                  <PrefButton id="male"
                      aria-label="Male"
                      value= "0"
                      onClick={this.handleMale}
                      active = {this.props.store.userStore.preference === 0}
                  >Male</PrefButton>
                  <PrefButton id="female"
                      aria-label="Female"
                      value= "1"
                      onClick={this.handleFemale}
                      active = {this.props.store.userStore.preference === 1}
                  >Female</PrefButton>
                  <PrefButton id="both"
                      aria-label="both"
                      value= "2"
                      onClick={this.handleBoth}
                      active = {this.props.store.userStore.preference === 2}
                  >Both</PrefButton>
                  <PrefBox id="gay"
                      aria-label="gay"
                      type="checkbox"
                      checked={this.props.store.userStore.gay === true}
                      onClick={this.handleGay}
                  />
                  <label style={{paddingLeft:"10px"}}>Gay</label>
                  <Tagline>Radius</Tagline>
                  <RadiusNum>{this.props.store.userStore.radius} Km</RadiusNum>
                  <br/>
                  <Slider
                    id="radius"
                    min={1}
                    max={10}
                    trackStyle={{
                      height: 2,
                      borderRadius: 6,
                      backgroundColor: "#f51a63",
                    }}
                    railStyle={{
                      width: "100%",
                      backgroundColor: "#5b5b5b",
                      height: 2,
                      borderRadius: 6,
                    }}
                    handleStyle={{
                      marginTop: -3.5,
                      width: 10,
                      height: 10,
                      backgroundColor: "#f51a63",
                      borderColor: "#f51a63",
                    }}
                    activeDotStyle={{
                      borderColor: "#f51a63",
                      border:2,
                    }}
                    dotStyle={{
                      bottom: -2,
                      marginLeft: -4,
                      width: 8,
                      height: 8,
                      border: 2,
                      borderColor: "#e9e9e9",
                      backgroundColor: "#f51a63"
                    }}
                    value={this.props.store.userStore.radius}
                    onChange={this.handleSlider} />
            </ProfileContent>
          </AuthorizedLayout>
        )
    }
}

const ProfileContent = styled.div`
  justify-items: center;
  min-height: 100vh;
  z-index: 1;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 50px;
`;

const Tagline = styled.div`
  width: 100%;
  font-weight: 500;
  color: #f3f3f3;
  font-size: 18px;
  max-width: 250px;
  display: block;
  margin-bottom: 20px;
  margin-top: 20px;

  &#photos {
    margin-top: 0; 
  }
`;
const RadiusNum = styled.div`
  color: #f3f3f3;
  font-size:13px;
  float: right;
`;
const ProfileImage = styled.div`
  width: 100%;
  display: inline-block;
`;
const ProfileImageMain = styled.img`
  width: 100%;
  max-width: 160px;
  height: 100%;
  max-height: 170px;
  border-radius: 5px;
  boder: none;
  float: left;

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
`;

const ProfileImageSet = styled.div`
  width: 100%;
  height: 100%;
  max-height: 145px;
  float: right;
`;

const Image = styled.image`
  width: 77px;
  height: 77px;
  background-color: #191919
  border-color: #191919
  border-radius: 5px;
  border: none;
  margin: auto;
  margin-left: 2.7%;
  float: right;

  &:hover {
    cursor: pointer;
    background-position: 300px;
    background-color:  #191919;
    border: 1px solid #f51a63;
  }
  &:focus {
    outline: none !important;
    border: 1px solid #f51a63 !important;
  }

  &#img3 {
    margin-top: 2.5%;
  }
  &#img4 {
    margin-top: 2.5%;
    margin-left: 2.5%;
  }
  &#img2 {
    margin-left: 2.5%;
  }
`;

const BioText = styled.textarea`
  height: 90px;
  max-height: 150px;
  min-height: 90px;
  width: 100%;
  min-width: 335px;
  font-weight: 20;
  font-size: 16px;
  color: #ffffff;
  background-color: #191919;
  border-radius: 5px;
  border: none;
  justify-items: center;
  overflow: hidden;
  resize: hidden;

  &:focus {
    outline: none !important;
    border: 1px solid #f51a63 !important;
  }
`;
const PrefButton = styled.button`
  font-weight: 100;
  font-size: 15px;
  color: #ffffff;
  background-color: #191919;
  letter-spacing: 0.01px;
  text-align: center;
  border-radius: 5px;
  border: 0;
  padding: 12px;
  width: 90px;
  margin: auto;
  margin-bottom: 5px;
  margin-right: 15px;
  transition: 0.5s all ease;
  cursor: pointer;

  ${
    props => props.active &&
        css`
          background-position: 300px;
          background-color:  #f51a63;
          border: 1px solid #f51a63;
        `
  }
`;
const PrefBox = styled.input`
position: relative; /* permet de positionner les pseudo-éléments */
padding-left: 20px; 
cursor: pointer; 

&:before {
  content: '';
  position: absolute;
  left: 0px; top: -1px;
  width: 17px; height: 17px; 
  border: 1px solid #191919;
  background: #191919;
  border-radius: 2px;
  box-shadow: none;
}


${
  props => props.checked &&
      css`
      &:after {
        content: '✔';
        position: absolute;
        top: .5px; left: 2.5px;
        font-size: 16px;
        color: #f51a63;
        transition: all .2s;
      }
      `
}
`;

export default editProfile;
