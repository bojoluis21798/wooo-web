import React, { Component } from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import { inject , observer} from 'mobx-react';
import AuthorizedLayout from '../layouts/AuthorizedLayout';
import axios from 'axios'

@inject('store')
@observer
export default class VideoChat extends Component {

    state = {
        token: null,
        session: null
    }

    async componentDidMount() {
        this.props.store.appStore.startLoading()

        const response = await axios.get('http://localhost:7000/get_token/6/5')
        const data = response.data
        const { token, session } = data
        this.setState({ token, session })
        console.log(token, session)
    }
  
    render() {
        return (
            <AuthorizedLayout>
                { this.state.session && this.state.token? (<OTSession 
                    apiKey={process.env.REACT_APP_OPENTOK_API_KEY}
                    sessionId={this.state.session}
                    token={this.state.token}>
                    <OTPublisher />
                    <OTStreams>
                        <OTSubscriber />
                    </OTStreams>
                </OTSession>): '' }
            </AuthorizedLayout>
        )
    }
}
