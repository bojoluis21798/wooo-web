import React, { Component } from 'react'
import AuthorizedLayout from '../layouts/AuthorizedLayout'

export default class Content extends Component {
  render() {
    return (
        <AuthorizedLayout>
            I am a content.
        </AuthorizedLayout>
    )
  }
}

