import React, { Component } from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import ree from '../../imgs/00.jpg';
import '../../App.css';
import './main.css';

export class MessageHead extends Component {
  render() {
    return (
      <Row className="App-logo">
        <Col xs={5} md={4}>
          <Image src={ree} alt="Ree" width="100%" circle/>
        </Col>
        <Col xs={7}>
          {/* style="margin-bottom:10px;" */}
          <Col xs={12}>
            <strong>God is Love</strong>
          </Col>
          {/* style="margin-bottom:10px;" */}
          <Col xs={12}>
            God sent you the gift of life
          </Col>
        </Col>
      </Row>
    );
  }
}