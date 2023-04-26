import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import Button from "react-bootstrap/Button";

export default function CreditAccord({
  acc_num,
  rout_num,
  balance,
  token
}) {


  // handle credit bill payment
  const [creditPayAccNum, setCreditPayAccNum] = useState();
  const [creditPayRoutNum, setCreditPayRoutNum] = useState();
  const [creditPayAmount, setCreditPayAmount] = useState();

  const handleCreditPaySubmit = (e) => {
    console.log("Credit pay request")

    let balance = parseFloat(creditPayAmount);
    let description = `pay $${creditPayAmount} from account ${creditPayAccNum}
                      to credit account ${acc_num}`;

    fetch(`http://localhost:5001/api/clients/me/accounts/${acc_num}/withdraw`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // assuming you have a token for authentication
      },
      body: JSON.stringify({ balance, description }),
    })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error(response.statusText);
      }
      console.log("saving withdraw");
      return response.json();
    })
    .then(data => {
      console.log(data);
    })

    fetch(`http://localhost:5001/api/clients/me/accounts/${creditPayAccNum}/withdraw`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // assuming you have a token for authentication
      },
      body: JSON.stringify({ balance, description }),
    })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error(response.statusText);
      }
      console.log("saving withdraw");
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
  }

  const addToCreditBill = (e) => {

    let balance = 1000.00;
    //console.log(typeof balance);
    let description = `add $1000 to credit bill`;

    fetch(`http://localhost:5001/api/clients/me/accounts/${acc_num}/deposit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // assuming you have a token for authentication
      },
      body: JSON.stringify({ balance, description }),
    })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error(response.statusText);
      }
      console.log("saving deposit");
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    //e.preventDefault();
    window.location.reload();


  }


  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{acc_num} --- Due: ${balance}</Accordion.Header>
        <Accordion.Body>
          <p>Amount Due: {balance}</p>
          <p>Due Date: DD/MM/YY</p>
          <button onClick={e => {addToCreditBill(e)}}>Buy Something</button>
          <br/>
          <br/>

          <Accordion>
            <Accordion.Item eventKey="1P">
              <Accordion.Header>Pay</Accordion.Header>
              <Accordion.Body>

                <form onSubmit={e => {handleCreditPaySubmit(e)}}>
                  <h3>Pay From:</h3>
                  <label>Account Number</label>
                  <input
                    name='credit_pay_account_number'
                    placeholder='Paying Account Number'
                    type='number'
                    value={creditPayAccNum}
                    onChange={e => setCreditPayAccNum(e.target.value)}
                    required
                  />
                  <br/>
                  <br/>
                  <label>Routing Number</label>
                  <input
                    name='credit_pay_routing_number'
                    placeholder='Paying Routing Number'
                    type='number'
                    value={creditPayRoutNum}
                    onChange={e => setCreditPayRoutNum(e.target.value)}
                    required
                  />
                  <br/>
                  <br/>
                  <label>Amount</label>
                  <input
                    name='credit_pay_amount'
                    placeholder='$Amount'
                    type='number'
                    step='0.01'
                    value={creditPayAmount}
                    onChange={e => setCreditPayAmount(e.target.value)}
                    required
                  />
                  <br/>
                  <br/>
                  <button type="submit">Pay</button>

                </form>

                {/*
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
                */}
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1I">
              <Accordion.Header>Information</Accordion.Header>
              <Accordion.Body>
                <h3>Account Number: {acc_num}</h3>
                <h3>Routing Number: {rout_num}</h3>
              </Accordion.Body>
            </Accordion.Item>

          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>


  )


}
