import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
export default class Messages extends Component {
  render() {
    return (
      <div>
        {this.props.profile_id !== this.props.store.userStore.profile_id && (
          <Div>
            <Div2>
              <Img src={this.props.userData.pairedImage} alt={this.props.userData.pairedId}/>
            </Div2>
            <Div3>
              <div>
                <p>{this.props.message.content}</p>
              </div>
            </Div3>
          </Div>
        )}
        {this.props.profile_id === this.props.store.userStore.profile_id && (
          <DivContent>
            <Div4>
              <div>
                <p>{this.props.message.content}</p>
              </div>
            </Div4>
            <Div2>
              <Img src={this.props.store.userStore.profilePicture} alt={this.props.profile_id}/>
            </Div2>
          </DivContent>
        )}
      </div>
    );
  }
}


const Div = styled.div`
  display: flex;
  align-items: center;
`;

const Div2 = styled.div`
  width: 20%;
  display: inline-block;
`;

const Div3 = styled.div`
  width: 80%;
  display: inline-block;
  text-align: left;
  margin: 3px;
  padding: 1px;
  padding-left: 5px;
  background-color: #191919;
  border-radius: 10px;
`;

const Div3 = styled.div`
  width: 80%;
  display: inline-block;
  text-align: left;
  margin: 3px;
  padding: 1px;
  padding-left: 5px;
  background-color: #FC3F73;
  border-radius: 10px;
`;

const DivContent = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 50%;
`;