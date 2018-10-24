import React, {Component} from 'react'
import styled, {css} from "styled-components"
import { inject, observer } from 'mobx-react'
import { ToastContainer } from "react-toastify"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import axios from 'axios'
import AuthorizedLayout from '../layouts/AuthorizedLayout'

@inject('store') 
@observer
class EditProfile extends Component {
  onFormSubmit = (e) =>{
    e.preventDefault() 
    this.fileUpload(this.state.file).then((response)=>{
    })
  }

  onChange = (e) => {
    this.setState({file:e.target.files[0]})
  }

  handleSubmit = (e = null) => {
    if (e !== null){
      e.preventDefault();
    }
    const config = {
        headers: {
            Authorization: 'Token ' + this.props.store.userStore.token
        }
    }

    axios.put(`${process.env.REACT_APP_API_BASEURL}/profiles/${this.props.store.userStore.profile_id}/`, {
      bio:this.props.store.userStore.biography,
      sexual_preference:this.props.store.userStore.preference,
      search_radius:this.props.store.userStore.radius
    }, config)
  }

  handleMale = (e) => {
    this.props.store.userStore.setPreference(0)
    this.handleSubmit(e)
  }

  handleFemale = (e) => {
    this.props.store.userStore.setPreference(1)
    this.handleSubmit(e)
  }

  handleOthers = (e) => {
    this.props.store.userStore.setPreference(2)
    this.handleSubmit(e)
  }

  handleSlider = (radius) => {
    const store = this.props.store.userStore;
    store.setRadius(radius);
    this.handleSubmit(null)
  }


  handleChangeBio = (e) => {
    this.props.store.userStore.setBio(e.target.value);
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
              <Tagline>Photos</Tagline>
              <ProfileImage>
                  <ProfileImageMain alt='Profile' src={this.props.store.userStore.profilePicture} />
              </ProfileImage>
              <Tagline>Bio</Tagline>
              <BioText
                id="bio"
                name="bio"
                value={this.props.store.userStore.biography}
                onChange={this.handleChangeBio}
                onBlur={this.handleSubmit}
              />
              <Tagline>Preference</Tagline>
              <PrefButtonMale id="male"
                  aria-label="Male"
                  value= "0"
                  onClick={this.handleMale}
                  active = {this.props.store.userStore.preference === 0}
              >
                Male</PrefButtonMale>
              <PrefButtonFemale id="female"
                aria-label="Female"
                value= "1"
                onClick={this.handleFemale}
                active = {this.props.store.userStore.preference === 1}
              >
                Female</PrefButtonFemale>
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
            </ProfileContent>
          </AuthorizedLayout>
        )
    }
}

const ProfileContent = styled.div`
  justify-items: center;
  z-index: 1;
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
  height: 100%;
  max-height: 200px;
  width: 100%;
  max-width: 200px;
  border-radius: 15px;
  border: none;
  margin: auto;
`;

const BioText = styled.textarea`
  height: 90px;
  max-height: 150px;
  min-height: 90px;
  width: 100%;
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

export default EditProfile
