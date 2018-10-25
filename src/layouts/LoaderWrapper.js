import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';
import Loading from '../pages/Loading'

@inject('store')
@observer
export default class LoaderWrapper extends Component {
  render() {
    return this.props.store.appStore.loading? <Loading />: this.props.children
  }
}
