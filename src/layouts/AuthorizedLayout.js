
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

@inject('store') @observer
export default class AuthorizedLayout extends Component {
  
    isAuthorized = () => this.props.store.userStore.username

    render() {
        return this.isAuthorized()? this.props.children: (
            <Redirect to='/login'></Redirect>
        )
    }
}
