import React, { Component } from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import ree from '../../../imgs/00.jpg';
import './main.css';

export class MessageHead extends Component {
  reroute = () => {
    console.log("Hello");
  };
  render() {
    return (
      <div onClick={this.reroute}>
        <Link to={`/message/${this.props.roomID}`} className="link">
          <Row>
            <Col xs={5} md={4}>
              <Image src={ree} alt="Ree" width="100%" circle />
            </Col>
            <Col xs={7} className="tag">
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
        </Link>
      </div>
    );
  }
}