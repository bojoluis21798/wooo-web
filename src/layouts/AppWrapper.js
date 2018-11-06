import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import LoaderWrapper from './LoaderWrapper';
import firebase from 'firebase'
import Rebase from 're-base'
import AcceptCall from '../components/AcceptCall';
import { isEmpty } from 'lodash'

const base = Rebase.createClass(firebase.database())

@inject('store')
@observer
export default class AppWrapper extends Component {

    state = {
        hasError: false,
        error: null,
        info: null,
        called: null,
        caller: null
    }

    componentDidCatch(error, info) {
        this.setState({ error, info })
    }

    componentDidMount() {
        base.syncState(`/called/${this.props.store.userStore.user_slug}`, {
            context: this,
            state: 'called'
        })
    }

    componentDidUpdate() {
        console.log(this.state.called)
    }
  
    render() {
        return !isEmpty(this.state.called)? <AcceptCall caller={this.state.called.caller} />: <LoaderWrapper>{this.props.children}</LoaderWrapper>
    }
}
