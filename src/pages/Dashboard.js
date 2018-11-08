import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import AuthorizedLayout from '../layouts/AuthorizedLayout'
import axios from 'axios'
import MatchList from '../components/MatchList';
import SmallLoading from '../components/SmallLoading'
import Gender from '../components/GenderModal'
import firebase from 'firebase'

@observer
@inject('store')
export default class Dashboard extends Component{
    state = {
        currentUser: this.props.store.userStore.profile_id,
        pairedUser: [],
        loading: true
    }
    
    componentDidMount(){
        axios.get(`${process.env.REACT_APP_API_BASEURL}/profiles/${this.props.store.userStore.profile_id}/matches`).then((res)=>{
            this.props.store.userStore.setMatches(res.data);
            if(res.data){
                var pairedUser = [];
                res.data.forEach(element => {
                    var pairedInfo = {
                    pairedId: element.id,
                    pairedName: element.user.first_name,
                    pairedSlug: element.slug,
                    pairedBio: element.bio,
                    pairedImage: element.profile_image,
                    roomId: this.state.currentUser+'R'+element.id,
                    message: ""
                    }
                    pairedInfo.roomId = (element.id < this.state.currentUser) ? element.id+'R'+this.state.currentUser : this.state.currentUser+'R'+element.id
        
                    firebase.database().ref().child('roomData/'+pairedInfo.roomId).limitToLast(1).on('value', message => {
                    if(message.val() != null){
                        var lastmessage = Object.values(message.val());
                        pairedInfo.message = lastmessage[0].content;
                        this.setState({ pairedInfo })
                    }else{
                        pairedInfo.message = "";
                    } 
                    });
                    pairedUser.push(pairedInfo);
                    
                });
                this.setState({
                    pairedUser,
                    loading: false
                })
            }
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
                    { !this.state.loading? <MatchList pairedUser={this.state.pairedUser}></MatchList>: <SmallLoading /> }
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
