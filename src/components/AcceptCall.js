import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react';
import acceptCall from '../assets/icons/acceptcall.svg'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import Rebase from 're-base'

const base = Rebase.createClass(firebase.database())

@inject('store')
@observer
export default class AcceptCall extends Component {
    state = {
        thread: []
    }

    constructor(props) {
        super(props)
        this.props.store.messageStore.setPairSlug(this.props.caller.slug)
        this.props.store.messageStore.setPairName(this.props.caller.name)
        this.props.store.messageStore.setPairImage(this.props.caller.image)
        this.props.store.messageStore.setCurrentThread(this.props.caller.thread)
    }

    answerCall = () => {
        base.push(`/call/${this.props.caller.thread}`, { data: this.props.store.userStore.user_slug })
        base.remove(`/called/${this.props.store.userStore.user_slug}`)
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <Content>
                <Img src={this.props.caller.image} alt='Recipient Main Pic' />
                <Description>{this.props.caller.name} is calling you..</Description>
                <Link to={`/video/${this.props.caller.slug}`} onClick={this.answerCall}>
                    <img src={acceptCall} alt='Accept call' />
                </Link>
            </Content>   
        )
    }
}

const Content = styled.div`
    display: grid;
    height: 100vh;
    grid-template-rows: 200px 100px 20vh;
    grid-row-gap: 50px;
    align-content: center;
    justify-content: center;
    align-items: center;
    justify-items: center;
    background-color: #111111;
    color: #fff;
`

const Img = styled.img`
    border-radius: 9999px;
    max-width: 200px;
    align-self: flex-end;
    cursor: pointer;
`

const Description = styled.div`
    text-align: center;
    max-width: 250px;
    font-size: 24px;
    line-height: 37px;
`

