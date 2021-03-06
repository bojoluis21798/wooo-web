import React, { Component } from 'react'
import TailSpin from '../assets/animated/TailSpin'
import styled, { css } from 'styled-components'
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class Loading extends Component {
  render() {
    return (
        <LoadingScreen {...this.props}>
            <Container>
                <TailSpin 
                    width="50" 
                    height="50" 
                    color="#F11A61"
                    tailColor="#F11A61"    
                    />
            </Container>
        </LoadingScreen>
    )
  }
}

const LoadingScreen = styled.div`
    transition: 1s all;
    align-items: center;
    justify-items: center;
    color: #FFFFFF;
    display: grid;
    height: fill-available;
    ${props => props.isBlack? 
        css`background-color: #000000`
        : css`background-color: #111111` 
    }
`

const Container = styled.div`
    padding-top: 50px;
    padding-bottom: 50px;
`
