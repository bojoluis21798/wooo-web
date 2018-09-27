import React, {Component} from 'react'
// import AuthorizedLayout from '../layouts/AuthorizedLayout';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
class Profile extends Component {
    render(){
        return (
            // <AuthorizedLayout>
                <div>
                    <h1>Welcome to Profile</h1>
                </div>
            // </AuthorizedLayout>
        )
    }
}

export default Profile