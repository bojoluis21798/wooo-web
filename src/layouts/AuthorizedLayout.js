
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

@inject('store') @observer
export default class AuthorizedLayout extends Component {
  
    // isAuthorized = () => this.props.store.userStore.email

    isAuthorized = () => true

    render() {
        return this.isAuthorized()? this.props.children: (
            <Redirect to='/login'></Redirect>
        )
    }
}
