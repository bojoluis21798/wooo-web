import React, { Component } from 'react'
import dislike from '../assets/images/dislike.png'
import heart from '../assets/images/heart-outline.png'
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
    border-radius: 100%
    background-color: rgba(18, 18, 18, 1) 
    border: none
    color: white
    padding: 3vh
    margin: 3.5vh
    text-decoration: none
    display: inline-block
    font-size: 16px
    cursor: pointer
`

const ButtonArea = styled.div`
    width: 100%
    position: absolute
    bottom: 0
    justify-content: center
    display:flex
    flex-direction:row
    background-color: black
`

const Item = styled.div`
    align-self: center
`

const Icon = styled.img`
    width:5vh;
    height:5vh;
`;
