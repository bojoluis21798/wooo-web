import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import './main.css';
import {MessageBody} from '../message/message_body/MessageBody';

export class Messaging extends Component {
  render() {
    // console.log(number)
    return (
      <Grid>
        {/* style="line-height:1em" */}
        <br />
        <Row className="center">
          <Col>
            {/* style="border:1px solid black; margin-top:10px" */}
            <Col xs={10} md={8} lg={6}>
              <MessageBody roomID={this.props.roomID}/>
            </Col>
          </Col>
        </Row>
      </Grid>
    );
  }
}