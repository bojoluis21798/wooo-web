
import React, { Component } from 'react'
import styled from 'styled-components'

// Icons
import heartSvg from '../assets/images/heart.svg'

export default class Header extends Component {
  render() {
    return (
      <HeaderContainer>
        <Icon>
            <object data={heartSvg} aria-label='Heart icon' />
        </Icon>
        <Gutter></Gutter>
        <Icon>
            <object data={heartSvg} aria-label='Heart icon' />
        </Icon>
        <Icon>
            <object data={heartSvg} aria-label='Heart icon' />
        </Icon>
        <Icon>
            <object data={heartSvg} aria-label='Heart icon' />
        </Icon>
      </HeaderContainer>
    )
  }
}

const Gutter = styled.div``

const Icon = styled.div`

`

const HeaderContainer = styled.div`
    display: grid
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr
    align-items: center
    justify-content: middle
`

