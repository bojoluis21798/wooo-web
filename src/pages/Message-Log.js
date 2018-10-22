import React, { Component } from 'react';
import { Messaging } from './Messaging';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import { inject, observer } from 'mobx-react'
import AuthorizedLayout from '../layouts/AuthorizedLayout';
import styled from "styled-components";
import { Link } from 'react-router-dom'
import axios from 'axios';
import _ from 'lodash';

@inject('store') @observer
export default class MessageLog extends Component {
  componentDidMount(){
    console.log(this.props.store.userStore.profile_id)
  }
  render() {
    return (
      <AuthorizedLayout>
        <ToastContainer />
        <Main>
          <Router>
            <Switch>
              <Route path="/messages/:id" exact component={Messaging} />
              <Route path="*" component={Messages} />
            </Switch>
          </Router>
        </Main>
      </AuthorizedLayout>
    );
  }
}


const Main = styled.div`
  text-align: center;
  background-color: #111111;
  height: 100vh;
  position: relative;
  overflow: auto;
  overflow-x: hidden;
  color: white;
  padding-left:5%;
  padding-right:5%;
  font-family: 'Apercu';
`;

@inject('store') @observer
class Messages extends Component {
  state = {
    currentUser: this.props.store.userStore.profile_id,
    pairedUser: [],
  };

  MessageItems = () => {
    axios.get(`https://wooo.philsony.com/api/profiles/${this.props.store.userStore.profile_id}/matches`)
    .then(response => {
      console.log(response);
      if(response.data){
        var pairedUser = [];
        response.data.forEach(element => {
          var pairedInfo = {
            pairedId: element.id,
            pairedName: element.user.first_name,
            pairedImage: element.profile_image,
            roomId: this.state.currentUser+'R'+element.id,
          }
          pairedInfo.roomId = (element.id < this.state.currentUser) ? element.id+'R'+this.state.currentUser : this.state.currentUser+'R'+element.id
          pairedUser.push(pairedInfo);
        });
        this.setState({
          pairedUser,
        })
      }
    })
    const matches= this.state.pairedUser;
    const items = [];

  _.mapKeys(matches, (data, index) => {
    items.push(
      <div key={index}>
        <MessageHead
          {...data}
        />
        <hr/>
      </div>,
    );
  });

  return items;
  };
  render() {
    return (
      <div>
        <Tag>
          <h2><strong>Messages</strong></h2>
        </Tag>
        <Search>
          <Input type="text" id="usr" placeholder="Search for a message"/>
        </Search>
        <div>
          {this.MessageItems()}
        </div>
      </div>
    );
  }
}

const Tag = styled.div`
  text-align: left;
`;

const Search = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  height: 45px;
  min-height: 45px;
  width: 100%;
  font-weight: 20;
  font-size: 18px;
  padding: 15px;
  color: #ffffff !important;
  background-color: #191919 !important;
  border-radius: 5px;
  border: none;
  justify-items: center;
  overflow: hidden;
  resize: hidden;
  border: 1px solid #191919 !important;
  
  &:focus {
    outline: none !important;
    border: 1px solid #f51a63 !important;
  }
`;

class MessageHead extends Component {
    render() {
      return (
        <Linked>
          <Link to={{ pathname: `/messages/${this.props.roomId}`, state: this.props }}>
            <Content>
              <Div3>
                <Image src={this.props.pairedImage} alt={this.props.name}/>
              </Div3>
              <Div7>
                <Name>
                  <strong>
                    {this.props.pairedName}
                  </strong>
                </Name>
                <div>
                  <LastMessage>
                    {this.props.pairedName}
                  </LastMessage>
                </div>
              </Div7>
            </Content>
          </Link>
        </Linked>
      );
    }
  }
  
  const Linked = styled.div`
    color: white !important;
    text-decoration: none;
  `;
  
  const Content = styled.div`
    display: flex;
    align-items: center;
  `;
  
  const Image = styled.img`
    min-width: 100% !important;
    height: auto;
    border-radius: 100%;
  `;
  
  const  Div3 = styled.div`
    flex: 1 1 !important;
    padding: 0px;
    margin: 0px;
  `;
  
  const Div7 = styled.div`
    flex: 3 3 !important;
    padding-left: 5%;
    padding-right: 5%;
    text-align: left;
    color: white !important;
    text-decoration: none;
  `;
  
  const Name = styled.div`
    font-size: 1.5em;
  `;
  
  const LastMessage = styled.p`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis !important;
  `;