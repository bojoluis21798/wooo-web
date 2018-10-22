import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

export default class Loading extends Component {
  render() {
    return (
        <LoadingScreen>
            <div>
                <Loader 
                    type="Rings"
                    color="#FFFFFF"
                    height="80"
                    width="80" />
                <p>{ this.props.message? this.props.message: 'We\'re loading some things for you.' }</p>
            </div>
        </LoadingScreen>
    )
  }
}

const LoadingScreen = styled.div`
    transition: 1s all;
    background-color: #000000;
    width: 100vw;
    height: 100vh;
    display: grid;
    align-items: center;
    justify-items: center;
    color: #FFFFFF;
    grid-template-rows: 1fr 1fr;
    text-align: center;
`
