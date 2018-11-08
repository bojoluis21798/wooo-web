import React, { Component } from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react'
import { inject , observer} from 'mobx-react'
import styled from 'styled-components'
import AuthorizedLayout from '../layouts/AuthorizedLayout'
import axios from 'axios'
import '../assets/styles/css/opentok.css'
import SmallLoading from '../components/SmallLoading'
import firebase from 'firebase'
import endCall from '../assets/icons/endcall.svg'
import Rebase from 're-base'
import { Redirect } from 'react-router-dom'

const base = Rebase.createClass(firebase.database())

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

    componentDidMount() {
        base.syncState(`/call/${this.props.store.messageStore.currentThread}`, {
            context: this,
            state: 'call'
        })
    }
    
    async componentWillMount() {
        const response = await axios.get(`${process.env.REACT_APP_OPENTOK_SERVER}/get_token/${this.props.match.params.slug}/${this.props.store.userStore.user_slug}`)
        const { token, session } = response.data
        this.setState({ token, session })
    }
    
    endCall = () => {
        this.setState({ call: null })
        this.props.history.goBack()
    }

    componentDidUpdate() {
        console.log(this.state.call)
    }

    render() {
        return (
            <AuthorizedLayout noheaders={true} noPad={true} className={`key-is-${process.env.REACT_APP_OPENTOK_KEY}`}>
                { this.state.call && Object.keys(this.state.call).length >= 2? <VideoContent>
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
                : (<AuthorizedLayout noheaders={true}>
                    <EmphasizedText>
                        { this.state.call?
                            this.state.call.length === 1? 'Waiting for a response'
                            : <Redirect to={`/messages/${this.props.store.messageStore.currentThread}`} />
                          : ''
                        }
                    </EmphasizedText>
                </AuthorizedLayout>) }
                <div className='video__button'>
                    <img onClick={this.endCall} src={endCall} alt='End call' className='video__button--end_call' />
                </div>
            </AuthorizedLayout>
        )
    }
}

const VideoContent = styled.div`
    width: 100vw;
    height: 100vh;
`

const EmphasizedText = styled.div`
    height: 100vh;
    font-size: 22px;
    display: grid;
    align-items: center;
    justify-items: center;
    justify-content: center;
`
