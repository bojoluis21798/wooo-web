import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { inject, observer } from 'mobx-react'
import AuthorizedLayout from '../layouts/AuthorizedLayout'
import axios from 'axios'
import dog from '../assets/images/dog.jpeg';
import dog2 from '../assets/images/dog2.jpg';
import dog3 from '../assets/images/dog3.jpg';
import MatchList from '../components/MatchList';
import NoMatchYet from '../components/NoMatchYet';

@observer
@inject('store')
export default class Dashboard extends Component{

    constructor(props){
        super(props)

        this.state = {
            people: [
                {
                    name: "Rico",
                    age: 16,
                    img: [dog, dog2, dog3],
                    location: "DOWNTOWN MANHATTAN, NEW YORK",
                    bio: "My friends call me daddy. I can't figure out why. Do you mind helping me figure it out?",
                },
                {
                    name: "Rob",
                    age: 17,
                    img: [dog2, dog, dog3],
                    location: "DOWNTOWN MANHATTAN, NEW YORK",
                    bio: "Im chinese",
                },
                {
                    name: "Joe",
                    age: 17,
                    img: [dog3, dog, dog2],
                    location: "DOWNTOWN MANHATTAN, NEW YORK",
                    bio: "Im white",
                }
            ]
        }

    }
    componentDidMount(){
        axios.get(`${process.env.REACT_APP_API_BASEURL}/profiles/${this.props.store.userStore.profile_id}/matches`).then((res)=>{
            console.log("List of matches");
            console.log(res.data);
            this.props.store.userStore.setMatches(res.data);
        })
    }
    render(){
        return (
            <AuthorizedLayout
                noheaders={false}
                noPad={false}
            >
                {
                    this.props.store.userStore.matches.length !== 0 &&
                    this.props.store.userStore.matches.matches_exists  &&

                <Header>
                        <HeaderStyle>Matches</HeaderStyle>
                </Header>
                }
                    <MatchList></MatchList>
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
    font-size:3.5vh;
    font-color:white;
    justify-self:start;
`
