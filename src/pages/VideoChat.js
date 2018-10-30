import React, { Component } from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react'
import { inject , observer} from 'mobx-react'
import styled from 'styled-components'
import AuthorizedLayout from '../layouts/AuthorizedLayout'
import axios from 'axios'
import '../assets/styles/css/opentok.css'
import SmallLoading from '../components/SmallLoading'

@inject('store')
@observer
export default class VideoChat extends Component {

    state = {
        token: null,
        session: null,
        hasError: true
    }

    streamProperties = {
        audioFallbackEnabled: false,
        showControls: true
    }

    async componentDidMount() {
        this.props.store.appStore.startLoading()
        const response = await axios.get(`${process.env.REACT_APP_OPENTOK_SERVER}/get_token/6/5`)
        const data = response.data
        const { token, session } = data
        this.setState({ token, session })
        this.props.store.appStore.doneLoading()
    }

    
    render() {
        return (
            <AuthorizedLayout noheaders={true} noPad={true} className={`key-is-${process.env.REACT_APP_OPENTOK_KEY}`}>
                <VideoContent>
                    { this.state.session && this.state.token? (
                        <OTSession 
                            apiKey={process.env.REACT_APP_OPENTOK_KEY}
                            sessionId={this.state.session}
                            token={this.state.token}
                        >
                            <OTPublisher properties={this.streamProperties} />
                            <OTStreams>
                                <OTSubscriber 
                                    onError={this.handleError} 
                                    properties={this.streamProperties}
                                />
                            </OTStreams>
                        </OTSession>): <SmallLoading /> 
                    }
                </VideoContent>
            </AuthorizedLayout>
        )
    }
}

const VideoContent = styled.div`
    width: 100vw;
    height: 100vh;
`
