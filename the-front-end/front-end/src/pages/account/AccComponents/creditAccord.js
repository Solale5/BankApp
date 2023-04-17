import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import Button from "react-bootstrap/Button";

export default function CreditAccord({
  acc_num
}) {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>...{acc_num}</Accordion.Header>
        <Accordion.Body>
          <p>Amount Due: $XXXX.XX</p>
          <p>Due Date: DD/MM/YY</p>









          <Accordion>
            <Accordion.Item eventKey="1P">
              <Accordion.Header>Pay</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="CreditSelectAcc"
                  >

                    <Form.Label>Select Account:</Form.Label>
                    <Form.Select>
                      <option>Select</option>
                      <option>Checking</option>
                      <option>Saving</option>
                    </Form.Select>

                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="CheckingTransferAmount"
                  >
                    <Form.Label column sm={2}>
                      $
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control type="text" placeholder="Amount" />
                    </Col>
                  </Form.Group>

                  <Button variant="secondary" onClick={" "}>
                    Pay
                  </Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1I">
              <Accordion.Header>Information</Accordion.Header>
              <Accordion.Body>
                account number and routing number goes here
              </Accordion.Body>
            </Accordion.Item>

          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>


  )


}
