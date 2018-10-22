import React from 'react'
import MessageHead from './MessageHead'

export default props => {
    return (
      props.pairedUser && props.pairedUser.length ? props.pairedUser.map((match, index) => (
        <MessageHead {...match} key={index} />
      )):
      <p>There are no messages at the moment.</p>
    ) 
}
