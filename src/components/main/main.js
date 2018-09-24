import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { Header } from '../header/main';
import { MessageHead } from '../message_head/main';
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

              <MessageHead /><MessageHead /><MessageHead /><MessageHead /><MessageHead />

              <hr />

            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}