import React from 'react'
import styled from 'styled-components'
import MessageHead from './MessageHead'
import SmallLoading from '../components/SmallLoading';

export default props => {
    return (
      props.pairedUser?
        <MessagesContainer>
          { props.pairedUser.length ? props.pairedUser.map((match, index) => (
            <MessageHead {...match} key={index} />
          )): 'You have not received/made any messages as of the moment.' }
        </MessagesContainer>
      : 
      <SmallLoading />
    )   
}

const MessagesContainer = styled.div`
  overflow: auto;
  min-height: 300px;
`
