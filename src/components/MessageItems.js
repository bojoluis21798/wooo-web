import React from 'react'
import MessageHead from './MessageHead'
import _ from 'lodash'

export default props => {
    return (
      props.pairedUser? props.pairedUser.map((match, index) => (
        <MessageHead {...match} key={index} />
      )):
      <p>There are no messages at the moment.</p>
    ) 
}
