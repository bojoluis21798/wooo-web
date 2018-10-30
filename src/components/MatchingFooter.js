import React, { Component } from 'react'
import dislike from '../assets/icons/dislike.svg'
import heart from '../assets/icons/heart-control.svg'
import styled from 'styled-components'

export default class FooterArea extends Component {
    render()  {
        return (
            <ButtonArea>
                <Item>
                    <ButtonActions onClick = {this.props.handleDislike}>
                        <Icon src={dislike}/>
                    </ButtonActions>
                </Item>
                <Item>
                    <ButtonActions onClick = {this.props.handleLike}>
                        <Icon src={heart}/>
                    </ButtonActions>
                </Item>
            </ButtonArea>
        )
    }
}

const ButtonActions = styled.button`
    display: grid;
    text-decoration: none
    display: inline-block
    font-size: 16px
    cursor: pointer
`

const ButtonArea = styled.div`
    width: 100%
    position: fixed
    bottom: 5%
    justify-content: center
    display:flex
    flex-direction:row
`

const Item = styled.div`
    align-self: center;
    grid-template-columns: 1fr 1fr 
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    grid-column-gap: 50px;
`

const Icon = styled.img`
`;
