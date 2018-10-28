import React, { Component } from 'react'
import ErrorPage from '../pages/ErrorPage'

export default class AppWrapper extends Component {
  
    state = {
        hasError: false,
        error: null,
        info: null
    }

    componentDidCatch(error, info) {
        this.setState({ error, info })
        console.log("Error: ", error)
        console.log("Info: ", info)
    }
  
  render() {
    return this.props.children
    // return !this.state.hasError? 
    //     this.props.children
    //     : <ErrorPage 
    //         error={this.state.error} 
    //         info={this.state.info} 
    //     />
  }
}
