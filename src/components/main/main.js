import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { Header } from '../header/header'
import { ree } from '../../imgs/00.jpg';
import './main.css';

export class Main extends Component {
  render() {
    return (
      <Grid>
        {/* style="line-height:1em" */}
        <Row>
          {/* style="border:1px solid black; margin-top:10px" */}
          <Col xs={12} md={12} lg={4}>
            <Header />
            <br />
            <hr />
            {/*  style="margin: 10px" */}
            <div>
              {/* style="margin-bottom:10px;" */}
              <div>
                <strong>MESSAGES</strong>
              </div>
              <div>
                <div class="form-group">
                  {/* style = "background-color: #F3EFEE" */}
                  <input type="text" class="form-control" id="usr" placeholder="Search for a message" />
                </div>
              </div>
              <Row>
                <Col xs={5} md={4}>
                  <img src={ree} class="img-circle" alt="Ree" width="100%" />
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

              <hr />

            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}