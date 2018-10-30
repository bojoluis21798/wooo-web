
import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Icons
import heartSvg from '../assets/icons/heart-2.svg'
import messageSvg from '../assets/icons/message.svg'
import userSvg from '../assets/icons/user-2.svg'
import bellSvg from '../assets/icons/bell.svg'

export default class Header extends Component {
  render() {
    return (
      <HeaderContainer>
        <Icon>
            <Link to='/matching'>
                <img src={heartSvg} alt='Heart icon' />
            </Link>
        </Icon>
        <Gutter></Gutter>
        <Icon>
            <Link to='/notifications'>
                <img src={bellSvg} alt='Bell icon' />
            </Link>
        </Icon>
        <Icon>
            <Link to='/messages'>
                <img src={messageSvg} alt='Message icon' />
            </Link>
        </Icon>
        <Icon>
            <Link to='/edit-profile'>
                <img src={userSvg} alt='User icon' />
            </Link>
        </Icon>
      </HeaderContainer>
    )
  }
}

const Gutter = styled.div``

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr 1fr 1fr 1fr;
    grid-column-gap: 18px;
    justify-items: center;
    padding-top: 20px;
    padding-left: 30px;
    padding-right: 15px;
    padding-bottom: 20px;
`

