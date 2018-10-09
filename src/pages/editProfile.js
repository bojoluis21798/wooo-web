import React, {Component} from 'react'
import styled, {css} from "styled-components"
import heart from "../assets/icons/heart.svg"
import alarm from "../assets/icons/alarm.png"
import chat from "../assets/icons/chat.png"
import user from "../assets/icons/user.png"
import { inject, observer } from 'mobx-react'
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
import {Link,Redirect} from 'react-router-dom';

@inject('store') @observer

class editProfile extends Component {
 
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
    console.log(this.props.store.userStore)
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
    console.log("Axios --POST")
    axios.put('https://wooo.philsony.com/api/profiles/'+this.props.store.userStore.profile_id+'/', {
      bio:this.props.store.userStore.biography,
      sexual_preference:this.props.store.userStore.preference,
      search_radius:this.props.store.userStore.radius
    },config)
    .then(response => {
      console.log(response);
      console.log("PuT was Successful!");

    })
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

  handleOthers = (e) => {
    const store = this.props.store.userStore;

    store.setPreference(2)
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
              <Header>
                {/* <Icon><img src="../assests/icons/heartfill.png" alt="my image" onclick={this.myfunction} /></Icon> */}
                {/* <Icon id="matching" aria-label="heart" data={heart} onClick={this.myfunction}/> */}
                {/* <form onSubmit={this.handleSubmit}> */}
                  <Tagline>Photos</Tagline>
                  <form>
                  <ProfileImage>
                    {/* <ProfileImageMain id="profilePic"/> */}
                    {/* <imageContainer> */}
                      <ProfileImageMain alt='Profile' src={this.props.store.userStore.profilePicture} />
                    {/* </imageContainer>  */}
                    {/* <ProfileImageSet>
                      <Image1 type="button">
                        <imgUp type="file" />
                      </Image1>
                      <Image2 type="button"/>
                      <Image3 type="button"/>
                      <Image4 type="button"/>
                    </ProfileImageSet> */}
                  </ProfileImage>
                  </form>
                  <Tagline>Bio</Tagline>
                  <BioText 
                    id="bio" 
                    name="bio" 
                    value={this.props.store.userStore.biography}
                    onChange={this.handleChangeBio} 
                    onBlur={this.handleSubmit}
                  />
                  <Tagline>Preference</Tagline>
                  {/* {PrefButton} */}
                  {/* <SexOptions choice={this.props.store.userStore.sexual_preference}/> */}
                  <PrefButtonMale id="male" 
                      aria-label="Male" 
                      value= "0" 
                      onClick={this.handleMale} 
                      active = {this.props.store.userStore.preference === 0}    
                  >Male</PrefButtonMale>
                  <PrefButtonFemale id="female" 
                      aria-label="Female" 
                      value= "1"
                      onClick={this.handleFemale} 
                      active = {this.props.store.userStore.preference === 1}
                  >Female</PrefButtonFemale>
                  <PrefButtonOthers id="other" 
                      aria-label="Others" 
                      value="2"
                      onClick={this.handleOthers} 
                      active = {this.props.store.userStore.preference === 2}
                  >Others</PrefButtonOthers>
                  <Tagline>Radius</Tagline>
                  <RadiusNum>{this.props.store.userStore.radius} Km</RadiusNum>
                  <br/>
                  <Slider 
                    id="radius" 
                    min={1} 
                    max={10} 
                    // defaultValue={this.props.store.userStore.radius}
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
                  <br/>
                  {/* <button value="submit" type="submit">Click here</button> */}
                {/* </form> */}
              </Header>
            </ProfileContent>
          </AuthorizedLayout>
        )
    }
}

const ProfileContent = styled.div`
  justify-items: center;
  height: 100vh;
  z-index: 1;
  padding-left: 20px;
  padding-right: 20px;
`;
const Header = styled.div`
margin: auto;
  min-width:30%;
  height:100vh;
`;

const Button = styled.button`
  width:40px;
  height:40px;
  margin-right: 120px
  background-image:heart
`;

const Icon = styled.object`
  width: 40px;
  height: 40px;
  margin: auto;
  margin-right: 120px;
  margin-bottom: 20px;
`;

const Icon2 = styled.object`
  width: 50px;
  margin: auto;
  margin-left: 8px;
  margin-bottom: 20px;
  margin-top: 10px;
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
`;
const RadiusNum = styled.div`
  color: #f3f3f3;
  font-size:13px;
  float: right;
`;
const ProfileImage = styled.div`
  width: 100%;
  display: flex; 
`;
const ProfileImageMain = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  border: none;
  margin: auto;
`;
// width: 100%;
//   max-width: 140px;
//   height: 100%;
//   max-height: 145px;
//   border-radius: 20px;
//   boder: none
//   margin: auto

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
// const ProfileImageSet = styled.div`
//   width: 100%;
//   height: 100%;
//   max-height: 145px;
//   float: right;
// `;
// const Image1 = styled.button`
//   width: 45%
//   height: 48%
//   background-color: #191919
//   border-color: #191919
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
// const imgUp = styled.input`
//   display: none
// `
// const Image2 = styled.button`
//   width: 45%
//   height: 48%
//   background-color: #191919
//   border-color: #191919
//   border-radius: 5px
//   margin: auto
//   margin-right: 3%
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
// const Image3 = styled.button`
//   width: 45%
//   height: 48%
//   background-color: #191919
//   border-color: #191919
//   border-radius: 5px
//   margin: auto
//   margin-top: 5%
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
// const Image4 = styled.button`
//   width: 45%
//   height: 48%
//   background-color: #191919
//   border-color: #191919
//   border-radius: 5px
//   margin: auto
//   margin-top: 5%
//   margin-right: 3%
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
const BioText = styled.textarea`
  height: 90px;
  max-height: 150px;
  min-height: 90px;
  width: 100%;
  min-width: 335px;
  font-weight: 20;
  font-size: 16px;
  padding: 15px;
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
const PrefButtonMale = styled.button`
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


  &:hover {
    cursor: pointer;
    background-position: 300px;
    background-color:  #191919;
    border: 1px solid #f51a63;
  }

  &:focus {
    background-position: 300px;
    background-color:  #f51a63;
    border: 1px solid #f51a63;
  }

  &:active {
    background-position: 300px;
    background-color:  #f51a63;
    border: 1px solid #f51a63;
  }

  ${
    props => props.active && 
        css`
          background-position: 300px;
          background-color:  #f51a63;
          border: 1px solid #f51a63;
        `
  }
`;
const PrefButtonFemale = styled.button`
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
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    background-color:  #191919;
    border: 1px solid #f51a63;
    box-sizing: border-box;
  }

  &:focus {
    background-color:  #f51a63;
    border: 1px solid #f51a63;
  }

  &:active {
    background-color:  #f51a63;
    border: 1px solid #f51a63;
  }

  ${
    props => props.active && 
        css`
          background-position: 300px;
          background-color:  #f51a63;
          border: 1px solid #f51a63;
        `
  }
`;
const PrefButtonOthers = styled.button`
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
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    background-position: 300px;
    background-color:  #191919;
    border: 1px solid #f51a63;
  }

  &:focus {
    background-position: 300px;
    background-color:  #f51a63;
    border: 1px solid #f51a63;
  }

  &:active {
    background-position: 300px;
    background-color:  #f51a63;
    border: 1px solid #f51a63;
  }

  ${
    props => props.active && 
        css`
          background-position: 300px;
          background-color:  #f51a63;
          border: 1px solid #f51a63;
        `
  }
`;

export default editProfile
