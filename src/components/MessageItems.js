import React from 'react'
import styled from 'styled-components'
import MessageHead from './MessageHead'

export default props => {
    return (
      props.pairedUser?
        <MessagesContainer>
          { props.pairedUser.length && props.pairedUser.map((match, index) => (
            <MessageHead {...match} key={index} />
          )) }
        </MessagesContainer>: ''
    )   
}

const MessagesContainer = styled.div`
  overflow: auto;
  min-height: 300px;
`
