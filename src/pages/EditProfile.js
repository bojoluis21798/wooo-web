import React, {Component} from 'react'
import styled, {css} from "styled-components"
import { inject, observer } from 'mobx-react'
import { ToastContainer } from "react-toastify"
import Slider from "rc-slider"
import Toggle from 'react-switch'
import "rc-slider/assets/index.css"
import axios from 'axios'
import AuthorizedLayout from '../layouts/AuthorizedLayout'

@inject('store') 
@observer
class EditProfile extends Component {
  // onFormSubmit = (e) =>{
  //   e.preventDefault() 
  //   this.fileUpload(this.state.file).then((response)=>{
  //   })
  // }

  // onChange = (e) => {
  //   this.setState({file:e.target.files[0]})
  // }
  componentDidMount(){
    console.log("This is Profile")
  }

  handleSubmit = (e = null) => {
    const token = this.props.store.userStore.token;
    const config = {
        headers: {
            'Authorization': 'Token ' + token,
        }
    }
    axios.put(`${process.env.REACT_APP_API_BASEURL}/profiles/${this.props.store.userStore.profile_id}/`, {
      bio:this.props.store.userStore.biography,
      sexual_preference:this.props.store.userStore.preference,
      gay:this.props.store.userStore.gay,
      search_radius:this.props.store.userStore.radius,
    },config)
    .then(response => {
      console.log(response);

    })
    .catch(error => {
      console.log(error);
    })
  }


  handleSubmitImage = (num) => {
    const token = this.props.store.userStore.token;
    const config = {
        headers: {
            'Authorization': 'Token ' + token,
            'content-type': 'multipart/form-data'
            
        }
    }
    const fd = new FormData();
    fd.append('supporting_pic_'+num+'',this.props.store.userStore.photos[0])
    fd.append('gay',this.props.store.userStore.gay)
    const url = `${process.env.REACT_APP_API_BASEURL}/profiles/${this.props.store.userStore.profile_id}/`;
    axios.put(url,fd,config)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })

  }

  handleImageOne = (event) => {
    const store = this.props.store.userStore;
    
    store.setPic(event.target.files[0])
    this.handleSubmitImage(1)
  }

  handleImageTwo = (event) => {
    const store = this.props.store.userStore;
    
    store.setPic(event.target.files[0])
    this.handleSubmitImage(2)
  }

  handleImageThree = (event) => {
    const store = this.props.store.userStore;
    
    store.setPic(event.target.files[0])
    this.handleSubmitImage(3)
  }

  handleImageFour = (event) => {
    const store = this.props.store.userStore;
    
    store.setPic(event.target.files[0])
    this.handleSubmitImage(4)
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

  handleGay = (e) => {
    const store = this.props.store.userStore;

    if(store.gay === false) {
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
                  <ImageContainer>
                    <Image 
                      id="img1" 
                      style={{ 
                        backgroundImage: 'url(https://wooo.philsony.com'+ this.props.store.userStore.photo_link_1 +')',
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPostion: "center"
                      }} 
                      onClick={(e) =>{this.refs.fileUploader1.click();}} 
                    >
                      <input 
                        id="imageOne"
                        type="file" 
                        ref="fileUploader1" 
                        style={{display:"none"}} 
                        onChange={this.handleImageOne}
                      />
                    </Image>
                    <Image 
                      id="img2" 
                      style={{ 
                        backgroundImage: 'url(https://wooo.philsony.com'+ this.props.store.userStore.photo_link_2 +')',
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPostion: "center"
                      }} 
                      onClick={(e) =>{this.refs.fileUploader2.click();}} 
                    >
                      <input 
                        id="imageTwo"
                        type="file" 
                        ref="fileUploader2" 
                        style={{display:"none"}} 
                        onChange={this.handleImageTwo}
                      />
                    </Image>
                    <Image 
                      id="img3" 
                      style={{ 
                        backgroundImage: 'url(https://wooo.philsony.com'+ this.props.store.userStore.photo_link_3 +')',
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPostion: "center" 
                    }} 
                      onClick={(e) =>{this.refs.fileUploader3.click();}} 
                    >
                      <input 
                        id="imageThree"
                        type="file" 
                        ref="fileUploader3" 
                        style={{display:"none"}} 
                        onChange={this.handleImageThree}
                      />
                    </Image>
                    <Image 
                      id="img4" 
                      style={{ 
                        backgroundImage: 'url(https://wooo.philsony.com'+ this.props.store.userStore.photo_link_4 +')',
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPostion: "center" 
                      }} 
                      onClick={(e) =>{this.refs.fileUploader4.click();}} 
                    >
                      <input 
                        id="imageFour"
                        type="file" 
                        ref="fileUploader4"  
                        style={{display:"none"}} 
                        onChange={this.handleImageFour}
                      />
                    </Image>
                  </ImageContainer>
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
              <PreferenceContainer>
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
                {/*<PrefButtonOthers id="other"
                    aria-label="Others"
                    value="2"
                    onClick={this.handleOthers}
                    active = {this.props.store.userStore.preference === 2}
                >Others</PrefButtonOthers>*/}
              </PreferenceContainer>
              <br /><br /> {/* THIS IS A TEMPORARY SOLUTION BECAUSE I CANT GET THE STYLING TO WORK - Kobe */}
              
                <label htmlFor="normal-switch">
                  <SgContainer>
                    <span style={{marginRight: "10px"}}>Homosexual</span>
                    <Toggle
                      className="gayToggle"
                      id="normal-switch"
                      aria-label="gay"
                      onColor="#f51a63"
                      offColor="#191919"
                      uncheckedIcon={false}
                      checkedIcon={true}
                      checked={this.props.store.userStore.gay}
                      onChange={this.handleGay}
                    />
                  </SgContainer>
                </label>
              
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
  max-height: 150px;
  max-width: 150px;
  border-radius: 5px;
  border: none;
  border-left: 5px;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 2px; 
  grid-row-gap: 2px;
`;

const PreferenceContainer = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-column-gap: 5px;
  grid-row-gap: 20px;
`;

const SgContainer = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
  align-items: center;
`;

const Image = styled.div`
  width: 73px;
  height: 73px;
  background-color: #191919
  border-color: #191919
  border-radius: 2px;
  border: none;
  margin-left: 2.7%;
  float: right;

  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none !important;
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
  transition: 0.5s all ease;
  cursor: pointer;

  ${
    props => props.active &&
        css`
          background-position: 300px;
          background-color:  #f51a63;
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
  transition: 0.5s all ease;
  box-sizing: border-box;
  cursor: pointer;

  ${
    props => props.active &&
        css`
          background-position: 300px;
          background-color:  #f51a63;
        `
  }
`;
// const PrefButtonOthers = styled.button`
//   font-weight: 100;
//   font-size: 15px;
//   color: #ffffff;
//   background-color: #191919;
//   letter-spacing: 0.01px;
//   text-align: center;
//   border-radius: 5px;
//   border: 0;
//   padding: 12px;
//   width: 90px;
//   transition: 0.5s all ease;
//   box-sizing: border-box;
//   cursor: pointer;

//   ${
//     props => props.active &&
//         css`
//           background-position: 300px;
//           background-color:  #f51a63;
//         `
//   }
// `;

export default EditProfile
