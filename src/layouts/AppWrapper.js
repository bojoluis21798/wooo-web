import { Component } from 'react'
import firebase from 'firebase'
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class AppWrapper extends Component {

    state = {
        hasError: false,
        error: null,
        info: null
    }

    componentDidCatch(error, info) {
        this.setState({ error, info })
    }
  
  render() {
    return this.props.children
    
  }
}
