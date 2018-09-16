

import React, { Component } from 'react'
import styled from 'styled-components'
import logo from '../assets/images/logo.svg'
import couple from '../assets/images/couple.svg'
import circlecenter from '../assets/images/circlecenterbg.svg'
import {Link} from 'react-router-dom';
import Dashboard from './Dashboard';
import FacebookLogin from 'react-facebook-login';

const LoginScreen = styled.div`
  position: relative;
  height: 100vh;
`

const LoginContent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-rows: 2fr 3fr 1fr;
  height: 100vh;
  z-index: 1;
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  z-index: -1;
  background-color: #F7F8FC;
  width: 100%;
  height: 100%;
`

const CircleCenter = styled.object`
  right: 0;
  position: absolute;
  top: 6vh;
`

const Header = styled.div`
  width: 80vw;
  margin: auto;
` 

const Logo = styled.object`
  width: 160px;
  display: block;
  margin: auto;
  padding-bottom: 20px;
`

const Tagline = styled.div`
  width: 100%;
  font-weight: 800;
  color: #FD3B6C;
  font-size: 24px;
  max-width: 250px;
  margin: auto;
  text-align: center;
`

const Couple = styled.object`
  width: 100vw;
  max-width: 400px;
`

const LoginActionSection = styled.div``

const LoginButton = styled.button`
  font-family: 'Apercu-Medium';
  text-transform: uppercase;
  font-size: 17px;
  color: #FFFFFF;
  letter-spacing: 0.01px;
  text-align: center;
  background-image: linear-gradient(-90deg, #FD3B6D 0%, #FD9351 100%);
  border-radius: 29px;
  border: 0;
  padding: 12px;
  width: 300px;
  margin: auto;
  display: block;
  margin-bottom: 5px;
  transition: .5s all ease;

  &:hover {
    cursor: pointer;
    background-position: 300px;
  }
`

const TermsNotice = styled.p`
  margin: auto;
  font-size: 12px;
  color: '#969696'
`

export default class Login extends Component {

  onLogin = () => {
    // do your login stuff here
    this.props.history.push("/dashboard");
  }

   responseFacebook = (response) => {
    console.log(response);
    this.onLogin();
  }

  render() {
    return (
      <LoginScreen>
        <BackgroundOverlay>
          <CircleCenter data={circlecenter}></CircleCenter>
        </BackgroundOverlay>
        <LoginContent>
          <Header>
            <Logo aria-label='Logo' data={logo}></Logo>
            <Tagline>Same ol' online dating but the cooler way!</Tagline>
          </Header>
          <Couple className={styled.couple} aria-label='Couple' data={couple}></Couple>
          <LoginActionSection>
          <FacebookLogin
            appId="878567238934074"
            autoLoad={true}
            fields="name,email,picture"
           
            callback={this.responseFacebook} />
            <TermsNotice>Upon logging in, you agree to our terms and conditions.</TermsNotice>
          </LoginActionSection>
        </LoginContent>
      </LoginScreen>
    )
  }
}
