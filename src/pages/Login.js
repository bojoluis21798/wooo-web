import React, { Component } from "react"
import styled from "styled-components"
import logo from "../assets/images/logo.svg"
import couple from "../assets/images/couple.svg"
import circlecenter from "../assets/images/circlecenterbg.svg"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
import { inject, observer } from "mobx-react"
import { ToastContainer } from "react-toastify"
import { Redirect, Link } from "react-router-dom"
import queryString from "query-string"
import Loading from "./Loading"

@inject("store")
@observer
export default class Login extends Component {
  state = {
    loading: 'Initializing the app..',
    checked: false,
  }

  authenticateUser = ({
    accessToken,
    email,
    name,
    picture,
    location,
    gender
  }) => {
    this.props.store.userStore.authenticateUser({
      accessToken,
      email,
      name,
      picture,
      location,
      gender
    })
  }

  responseFacebook = response => {
    this.authenticateUser(response)
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: null }), 1500)
  }

  componentDidUpdate() {
    if (
      this.props.location &&
      this.props.location.search &&
      queryString.parse(this.props.location.search).code
    ) {
      if (!this.state.loading) this.setState({ loading: 'Authenticating you..' })
    }
  }

  onLoginButtonClick = () => {
    if (this.state.checked) {
      this.setState({ loading: 'Authenticating you..' })
    }
  }

  handleCheck = (e) => {
    this.setState({
        checked: e.target.checked,
    })
  }

  render() {
    return this.props.store.userStore.email ? (
      <Redirect to="/edit-profile" />
    ) : this.state.loading ? (
      <Loading message={ this.state.loading } />
    ) : (
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
              scope="public_profile,user_friends"
              callback={this.responseFacebook}
              redirectUri={`${process.env.REACT_APP_SITE}/login`}
              onClick={this.onLoginButtonClick}
              render={renderProps => (
                <LoginButton onClick={renderProps.onClick}>
                  Login with Facebook
                </LoginButton>
              )}
            />
            <TermsNotice>
              <Link to="/policy-terms">See our terms and conditions</Link>
              <br/>
              <input
                className="form-check-input"
                type="checkbox"
                checked={this.state.checked}
                onChange = {this.handleCheck}
              />
              <label className="form-check-label" htmlFor="defaultCheck1">
                I hereby agree to the terms and conditions of the company.
              </label>
            </TermsNotice>
          </LoginActionSection>
        </LoginContent>
      </LoginScreen>
    )
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
