import React, { Component } from "react"
import styled from "styled-components"
import logo from "../assets/images/logo.svg"
import couple from "../assets/images/couple.svg"
import circlecenter from "../assets/images/circlecenterbg.svg"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
import { inject, observer } from "mobx-react"
import { ToastContainer } from "react-toastify"
import { Redirect } from "react-router-dom"
import LoaderWrapper from "../layouts/LoaderWrapper";

@inject("store")
@observer
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.props.store.appStore.startLoading()
  }

  responseFacebook = (response) => {
    this.props.store.userStore.authenticateUser(response)
  }

  componentDidMount() {
    setTimeout(() => this.props.store.appStore.doneLoading(), 1500)
  }

  onLoginButtonClick = () => {
    this.props.store.appStore.startLoading()
  }

  componentWillUnmount() {
    this.props.store.appStore.doneLoading()
  }

  render() {
    return this.props.store.userStore.token ? (
      <Redirect to={`${this.props.store.userStore.getRedirectTo() || '/dashboard'}`} />
    ) : <LoaderWrapper>
      <LoginScreen>
        <ToastContainer />
        <BackgroundOverlay>
          <CircleCenter data={circlecenter} />
        </BackgroundOverlay>
        <LoginContent>
          <Header>
            <Logo aria-label="Logo" data={logo} />
            <Tagline>Same ol' online dating but the cooler way!</Tagline>
          </Header>
          <Couple className={styled.couple} aria-label="Couple" data={couple} />
          <LoginActionSection>
            <FacebookLogin
              appId={process.env.REACT_APP_FB_APPID}
              fields="name,email,picture"
              scope="public_profile,email"
              callback={this.responseFacebook}
              redirectUri={`${process.env.REACT_APP_SITE}/login`}
              onClick={this.onLoginButtonClick}
              isProcessing={this.prepareLoginButton}
              render={renderProps => (
                <LoginButton
                  onClick={renderProps.onClick}
                  isProcessing={renderProps.isProcessing}
                >
                  Login with Facebook
                </LoginButton>
              )}
            />
            <TermsNotice>
              <label className="form-check-label" htmlFor="defaultCheck1">
                I hereby agree to the <a href="/privacy-terms">privacy policy</a> of the company.
              </label>
            </TermsNotice>
          </LoginActionSection>
        </LoginContent>
      </LoginScreen>
    </LoaderWrapper>
  }
}

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
`

const BackgroundOverlay = styled.div`
  position: fixed;
  z-index: -1;
  background-color: #f7f8fc;
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
  color: #fd3b6c;
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
  font-family: 'Apercu';;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 17px;
  color: #ffffff;
  letter-spacing: 0.01px;
  text-align: center;
  background-image: linear-gradient(-90deg, #fd3b6d 0%, #fd9351 100%);;
  border-radius: 29px;
  border: 0;
  padding: 12px;
  width: 300px;
  margin: auto;
  display: block;
  margin-bottom: 5px;
  transition: 0.5s all ease;

  &:hover {
    cursor: pointer;
    background-position: 300px;
  }
`

const TermsNotice = styled.div`
  margin: auto;
  font-size: 12px;
  color: "#969696";
`
