import React, {Component} from 'react'
import styled, {css} from "styled-components"
import { inject, observer } from 'mobx-react'
import { ToastContainer } from "react-toastify"
import axios from "axios"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import AuthorizedLayout from '../layouts/AuthorizedLayout'
import GenderModal from '../components/GenderModal'
import addPhoto from '../assets/icons/addphoto.svg'

@inject('store')
@observer
class EditProfile extends Component {
  // constructor(props){
  //   super(props)
  //   this.delayedCallback = _.debounce(this.props.store.userStore.setBio, 1000)
  // }

  handleSubmitBio = (e) => {
    const fd = new FormData()
        const url = `${process.env.REACT_APP_API_BASEURL}/profiles/${this.props.store.userStore.profile_id}/`;
        const config = {
            headers: {
                'Authorization': 'Token ' + this.props.store.userStore.token,
            }
        }
        fd.append('bio',this.props.store.userStore.biography)
        fd.append('location', this.props.store.userStore.location)
        fd.append('slug', this.props.store.userStore.user_slug)
        axios.put(url,fd,config)
        .then(response => {
            console.log(response)
        })
  }

  handleGay = (e) => {
    this.props.store.userStore.setPreference(0)

    this.props.store.userStore.handleSubmit()
  }

  handleStraight = (e) => {
    this.props.store.userStore.setPreference(1)
    this.props.store.userStore.handleSubmit()
  }

  handleSlider = (radius) => {
    this.props.store.userStore.setRadius(radius);
    this.props.store.userStore.handleSubmit(null)
  }

  handleChangeBio = (e) => {
    // e.persist()
    // this.delayedCallback(e)
    this.props.store.userStore.setBio(e.target.value);
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
                  <ImageContainer>
                    <PhotosDivider>
                      <Image
                        id="img1"
                        bgImage = {this.props.store.userStore.photo_link_1}
                        onClick={(e) =>{this.refs.fileUploader1.click()}}
                      >
                        <UserPhoto shown={!this.props.store.userStore.photo_link_1} src={addPhoto} alt='Add Profile Pic' />
                        <input
                          id="imageOne"
                          type="file"
                          ref="fileUploader1"
                          style={{display:"none"}}
                          onChange={e => this.props.store.userStore.handleSubmitImage(e, 1)}
                        />
                      </Image>
                      <Image
                        id="img2"
                        bgImage = {this.props.store.userStore.photo_link_2}
                        onClick={(e) =>{this.refs.fileUploader2.click();}}
                      >
                        <UserPhoto shown={!this.props.store.userStore.photo_link_2} src={addPhoto} alt='Add Profile Pic' />
                        <input
                          id="imageTwo"
                          type="file"
                          ref="fileUploader2"
                          style={{display:"none"}}
                          onChange={e => this.props.store.userStore.handleSubmitImage(e, 2)}
                        />
                      </Image>
                    </PhotosDivider>
                    <PhotosDivider>
                      <Image
                        id="img3"
                        bgImage = {this.props.store.userStore.photo_link_3}
                        onClick={(e) =>{this.refs.fileUploader3.click();}}
                        >
                        <UserPhoto shown={!this.props.store.userStore.photo_link_3} src={addPhoto} alt='Add Profile Pic' />
                        <input
                          id="imageThree"
                          type="file"
                          ref="fileUploader3"
                          style={{display:"none"}}
                          onChange={e => this.props.store.userStore.handleSubmitImage(e, 3)}
                          />
                      </Image>
                      <Image
                        id="img4"
                        bgImage = {this.props.store.userStore.photo_link_4}
                        onClick={(e) =>{this.refs.fileUploader4.click();}}
                        >
                        <UserPhoto shown={!this.props.store.userStore.photo_link_4} src={addPhoto} alt='Add Profile Pic' />
                        <input
                          id="imageFour"
                          type="file"
                          ref="fileUploader4"
                          style={{display:"none"}}
                          onChange={e => this.props.store.userStore.handleSubmitImage(e, 4)}
                          />
                      </Image>
                    </PhotosDivider>
                  </ImageContainer>
              </ProfileImage>
              <Tagline>Bio</Tagline>
              <BioText
                id="bio"
                name="bio"
                value={this.props.store.userStore.biography}
                placeholder="Tell us about yourself!"
                onChange={this.handleChangeBio}
                onBlur={this.handleSubmitBio}
              />
              <Tagline>Preference</Tagline>
              <PreferenceContainer>
                <PreferenceButton id="Straight"
                    aria-label="Straight"
                    value= "1"
                    onClick={this.handleStraight}
                    active = {this.props.store.userStore.preference === 1}
                  >Straight</PreferenceButton>
                <PreferenceButton id="Gay"
                    aria-label="Gay"
                    value= "1"
                    onClick={this.handleGay}
                    active = {this.props.store.userStore.preference === 0}
                >Gay</PreferenceButton>
              </PreferenceContainer>
              <Tagline>Radius</Tagline>
              <RadiusNum>{this.props.store.userStore.radius} Km</RadiusNum>
              <br/>
              <Slider
                id="radius"
                min={1}
                max={100}
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
  font-size: 19px;
  max-width: 250px;
  display: block;
  margin-bottom: 20px;
  margin-top: 30px;

  &:first-child {
    margin-top: 0px;
  }
`;
const RadiusNum = styled.div`
  color: #f3f3f3;
  font-size:13px;
  float: right;
`;
const ProfileImage = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const UserPhoto = styled.img`
  ${props => !props.shown? css`display: none`: ''}
`

const ProfileImageMain = styled.img`
  max-height: 165px;
  max-width: 165px;
  border-radius: 2px;
  border: none;
  border-left: 5px;
  justify-self: flex-end;
  margin-right: 12px;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 2px;
  margin-right: auto;
`;

const PhotosDivider = styled.div`
  display: grid;
  grid-column-gap: 2px;
  grid-template-columns: 1fr 1fr;
`

const PreferenceContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  align-items: center;
  grid-column-gap: 50px;
`;

const Image = styled.div`
  width: 80px;
  height: 80px;
  background-color: #191919
  border-color: #191919
  border-radius: 2px;
  border: none;
  margin: 2px;
  float: right;

  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none !important;
  }
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${
    props => {
      if(props.bgImage) {
        return css`
          background-image: url('https://wooo.philsony.com${props.bgImage}');
        `
      }
    }
  }
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
  resize: none;

  &:focus {
    outline: none !important;
  }
`;
const PreferenceButton = styled.button`
  font-weight: 100;
  font-size: 15px;
  color: #ffffff;
  background-color: #191919;
  letter-spacing: 0.01px;
  text-align: center;
  border-radius: 5px;
  width: 120px;
  border: 0;
  padding: 18px 25px;
  margin-top: 5px;
  margin-bottom: 5px;
  transition: 0.5s all ease;
  cursor: pointer;

  &:first-child {
    justify-self: flex-end;
  }

  ${
    props => props.active &&
        css`
          background-color:  #f51a63;
        `
  }
`;

export default EditProfile
