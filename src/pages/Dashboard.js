import React, {Component} from 'react'
import AuthorizedLayout from '../layouts/AuthorizedLayout';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
class Dashboard extends Component {
    render(){
        return (
            // <AuthorizedLayout>
                <div>
                    <p>Hello, {this.props.store.userStore.name}</p>
                    {/* <p>Your email is: { this.props.store.userStore.email }</p> */}
                    <img alt='Profile' src={this.props.store.userStore.profilePicture} />
                </div>
            // </AuthorizedLayout>
        )
    }
}

export default Dashboard
