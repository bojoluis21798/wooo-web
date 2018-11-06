import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import AuthorizedLayout from '../layouts/AuthorizedLayout'
import axios from 'axios'
import MatchList from '../components/MatchList';
import SmallLoading from '../components/SmallLoading'
import Gender from '../components/GenderModal'

@observer
@inject('store')
export default class Dashboard extends Component{
    
    state = {
        loading: true
    }

    componentDidMount(){
        axios.get(`${process.env.REACT_APP_API_BASEURL}/profiles/${this.props.store.userStore.profile_id}/matches`).then((res)=>{
            this.props.store.userStore.setMatches(res.data);

            this.setState({ loading: false })
        })
    }
    render(){
        return (
            <AuthorizedLayout
                noheaders={false}
                noPad={false}
            >
                {
                    (this.props.store.userStore.matches.length !== 0 &&
                    this.props.store.userStore.matches.matches_exists !== false)  &&

                    <Header>
                            <HeaderStyle>Matches</HeaderStyle>
                    </Header>
                }
                {
                    (this.props.store.userStore.gender === -1) &&  <Gender/>
                }
                    { !this.state.loading? <MatchList></MatchList>: <SmallLoading /> }
            </AuthorizedLayout>
        );
    }


}



const Header = styled.div`
    display:grid
    grid-template-columns:100%
`

const HeaderStyle = styled.div`
    text-align:center;
    font-size: 25px;
    justify-self:start;
`
