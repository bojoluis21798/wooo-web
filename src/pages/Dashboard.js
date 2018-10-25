import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { inject, observer } from 'mobx-react'
import AuthorizedLayout from '../layouts/AuthorizedLayout';

@observer
@inject('store')
export default class Dashboard extends Component{
    
    render(){
        return (
            <AuthorizedLayout 
                noheaders={false}
                noPad={false}
            >
                
            </AuthorizedLayout>
        );
    }
}