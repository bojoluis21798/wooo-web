import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react';
import endCall from '../assets/icons/endcall.svg'
import firebase from 'firebase'
import Rebase from 're-base'
import AuthorizedLayout from '../layouts/AuthorizedLayout'
import { values } from 'lodash'
import { Redirect } from 'react-router-dom'

const db = firebase.database()
const base = Rebase.createClass(db)

@inject('store')
@observer
export default class Calling extends Component {

    state = {
        call: []
    }

    componentDidMount() {
        base.syncState(`/call/${this.props.store.messageStore.currentThread}`, {
            context: this,
            state: 'call'
        })
        this.setState({ call: [...this.state.call, this.props.store.userStore.user_slug] })
        base.post(`/called/${this.props.store.messageStore.pairSlug}`, {
            data: {
                caller: {
                    thread: this.props.store.messageStore.currentThread,
                    name: this.props.store.userStore.name,
                    image: this.props.store.userStore.profilePicture,
                    slug: this.props.store.userStore.user_slug
                }
            }
        })
        this.callRef = setTimeout(() => {
            this.stopCall()
        }, 20000)
    }

    componentWillUnmount() {
        if(this.callRef) 
            clearTimeout(this.callRef)
    }

    stopCall = async () => {
        base.remove(`/called/${this.props.store.messageStore.pairSlug}`)
        base.remove(`/called/${this.props.store.userStore.user_slug}`)
        base.remove(`/call/${this.props.store.messageStore.currentThread}`)
        this.goBackToThread()
    }

    goBackToThread = () => {
        this.props.history.push('/messages/' + this.props.store.messageStore.currentThread)
    }

    componentDidUpdate() {
        if(this.state.call.length >= 2) 
            this.props.history.push(`/video/${this.props.store.messageStore.pairSlug}`)
    }

    render() {
        return (
            <AuthorizedLayout noheaders={true}>
                { this.state.call && (Array.isArray(this.state.call) && this.state.call.length < 2) || (typeof this.state.call === Object && Object.keys(this.state.call).length < 2)? <Content>
                    <Img src={this.props.store.messageStore.pairImage || ''} alt='Recipient Main Pic' />
                    <Description>Calling {this.props.store.messageStore.pairName }..</Description>
                    <img onClick={this.stopCall} src={endCall} alt='End call' />
                </Content>: <Redirect to={`/video/${this.props.store.messageStore.pairSlug}`} /> }
            </AuthorizedLayout>
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

