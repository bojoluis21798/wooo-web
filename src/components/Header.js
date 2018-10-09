
import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Icons
import heartSvg from '../assets/images/heart.svg'
import messageSvg from '../assets/images/message.svg'
import userSvg from '../assets/images/user.svg'
import bellSvg from '../assets/images/bell.svg'

export default class Header extends Component {
  render() {
    return (
      <HeaderContainer>
        <Icon>
            <Link to='/matching'>
                <object data={heartSvg} aria-label='Heart icon' />
            </Link>
        </Icon>
        <Gutter></Gutter>
        <Icon>
            <Link to='/notifications'>
                <object data={bellSvg} aria-label='Bell icon' />
            </Link>
        </Icon>
        <Icon>
            <Link to='/messages'>
                <object data={messageSvg} aria-label='Message icon' />
            </Link>
        </Icon>
        <Icon>
            <Link to='/edit-profile'>
                <object data={userSvg} aria-label='User icon' />
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
`

const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr 1fr 1fr 1fr;
    grid-column-gap: 18px;
    justify-items: center;
    padding-top: 20px;
    padding-bottom: 35px;
    padding-left: 10px;
    padding-right: 10px;
`

