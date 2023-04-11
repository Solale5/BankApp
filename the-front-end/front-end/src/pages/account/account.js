import React, { useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import Button from "react-bootstrap/Button";

import CheckingAccord from "./AccComponents/checkingAccord.js";
import SavingAccord from "./AccComponents/savingAccord.js";
import CreditAccord from "./AccComponents/creditAccord.js";

import AnimalCard from "./test";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import "./account.css";

{/* for formatting form in modal popup, shelved for now

  import Modal from "react-bootstrap/Modal";
  import Collapse from "react-bootstrap/Collapse";
*/}


// for how to add multiple events to a single button
// https://upmostly.com/tutorials/adding-multiple-functions-inside-a-single-onclick-event-handler

function AccountPage() {
  {
    /*modal popup show/close
    modals are shelved for now*/
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  {
    /* collapse open/close */
  }
  const [open, setOpen] = useState(false);

  {/*
   const toggle = () => {
     setOpen(!open);
   };
   */}

  {/* experimenting with for loop to display items */}
  const rows = [];
  let numrows = 3;
  for(let i = 0; i < numrows; i++) {
    rows.push(<p>item</p>);
  }


  const checkings = [];
  let numcheckings = 2;
  for(let i =0; i<numcheckings; i++) {
    checkings.push(<CheckingAccord
                    acc_num={i}
                    />);
  }

  const savings = [];
  let numsavings = 2;
  for(let i = 0; i<numsavings; i++) {
    savings.push(<SavingAccord
                  acc_num= {i}
                  />);
  }


  const credits = []
  let numcredits = 2;
  for(let i=0; i<numcredits; i++) {
    credits.push(<CreditAccord
                  acc_num={3*i}
                  />);
  }

  const tests = [];
  let testnum = 3;
  for(let i=0; i<testnum; i++){
    tests.push(<AnimalCard
                name={i}
                scientificName="scientificName"
                size="size"
              />)
  }







  return (
    //everything must go in between the "bod" div
    <div className="bod">
      {/* comments are showing for some reason
       use for loop with amount of accounts to determine
       how many accordion tabs to have */}

      <h1> Checking Accounts </h1>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Checking 1</Accordion.Header>
          <Accordion.Body>
            <Accordion>
              <Accordion.Item eventKey="1T">
                <Accordion.Header>Transfer</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="CheckingAccNum"
                    >
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          placeholder="Account Number"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="CheckingRoutNum"
                    >
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          placeholder="Routing Number"
                        />
                      </Col>
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
                      Transfer
                    </Button>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1W">
                <Accordion.Header>Withdraw</Accordion.Header>
                <Accordion.Body>
                  <Form>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="CheckingWithdrawAmount"
                    >
                      <Form.Label column sm={2}>
                        $
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Amount" />
                      </Col>
                    </Form.Group>

                    <Button variant="secondary" onClick={" "}>
                      Withdraw
                    </Button>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1D">
                <Accordion.Header>Deposit</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="CheckingDepositImage">
                      <Form.Label>Please upload image of Check</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>

                    <p> OR </p>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="checkingDepositAmount"
                    >
                      <Form.Label column sm={2}>
                        $
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Amount" />
                      </Col>
                    </Form.Group>

                    <Button variant="secondary" onClick={" "}>
                      Deposit
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

        <Accordion.Item eventKey="1">
          <Accordion.Header>Checking 2</Accordion.Header>
          <Accordion.Body>
            <Accordion>
              <Accordion.Item eventKey="1T">
                <Accordion.Header>Transfer</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="CheckingAccNum"
                    >
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          placeholder="Account Number"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="CheckingRoutNum"
                    >
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          placeholder="Routing Number"
                        />
                      </Col>
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
                      Transfer
                    </Button>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1W">
                <Accordion.Header>Withdraw</Accordion.Header>
                <Accordion.Body>
                  <Form>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="CheckingWithdrawAmount"
                    >
                      <Form.Label column sm={2}>
                        $
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Amount" />
                      </Col>
                    </Form.Group>

                    <Button variant="secondary" onClick={" "}>
                      Withdraw
                    </Button>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1D">
                <Accordion.Header>Deposit</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="CheckingDepositImage">
                      <Form.Label>Please upload image of Check</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>

                    <p> OR </p>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="checkingDepositAmount"
                    >
                      <Form.Label column sm={2}>
                        $
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Amount" />
                      </Col>
                    </Form.Group>

                    <Button variant="secondary" onClick={" "}>
                      Deposit
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

      <h1> Saving Accounts </h1>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Saving 1</Accordion.Header>
          <Accordion.Body>
            <Accordion>
              <Accordion.Item eventKey="1T">
                <Accordion.Header>Transfer</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="SavingAccNum"
                    >
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          placeholder="Account Number"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="SavingRoutNum"
                    >
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          placeholder="Routing Number"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="SavingTransferAmount"
                    >
                      <Form.Label column sm={2}>
                        $
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Amount" />
                      </Col>
                    </Form.Group>

                    <Button variant="secondary" onClick={" "}>
                      Transfer
                    </Button>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1W">
                <Accordion.Header>Withdraw</Accordion.Header>
                <Accordion.Body>
                  <Form>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="SavingWithdrawAmount"
                    >
                      <Form.Label column sm={2}>
                        $
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Amount" />
                      </Col>
                    </Form.Group>

                    <Button variant="secondary" onClick={" "}>
                      Withdraw
                    </Button>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1D">
                <Accordion.Header>Deposit</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="SavingDepositImage">
                      <Form.Label>Please upload image of Check</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>

                    <p> OR </p>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="SavingDepositAmount"
                    >
                      <Form.Label column sm={2}>
                        $
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Amount" />
                      </Col>
                    </Form.Group>

                    <Button variant="secondary" onClick={" "}>
                      Deposit
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
      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Saving 2</Accordion.Header>
          <Accordion.Body>
            <Accordion>
              <Accordion.Item eventKey="1T">
                <Accordion.Header>Transfer</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="SavingAccNum"
                    >
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          placeholder="Account Number"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="SavingRoutNum"
                    >
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          placeholder="Routing Number"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="SavingTransferAmount"
                    >
                      <Form.Label column sm={2}>
                        $
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Amount" />
                      </Col>
                    </Form.Group>

                    <Button variant="secondary" onClick={" "}>
                      Transfer
                    </Button>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1W">
                <Accordion.Header>Withdraw</Accordion.Header>
                <Accordion.Body>
                  <Form>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="SavingWithdrawAmount"
                    >
                      <Form.Label column sm={2}>
                        $
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Amount" />
                      </Col>
                    </Form.Group>

                    <Button variant="secondary" onClick={" "}>
                      Withdraw
                    </Button>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1D">
                <Accordion.Header>Deposit</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="SavingDepositImage">
                      <Form.Label>Please upload image of Check</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>

                    <p> OR </p>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="SavingDepositAmount"
                    >
                      <Form.Label column sm={2}>
                        $
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Amount" />
                      </Col>
                    </Form.Group>

                    <Button variant="secondary" onClick={" "}>
                      Deposit
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

      <h1> Credit Accounts </h1>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Credit 1</Accordion.Header>
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

              <Accordion.Item eventKey="1A">
                <Accordion.Header>Automate</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="CreditAutoAccNum"
                    >
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          placeholder="Account Number"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="CreditAutoRoutNum"
                    >
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          placeholder="Routing Number"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="CreditSelectAcc"
                    >

                      <Form.Label>From:</Form.Label>
                      <Form.Select>
                        <option>Select</option>
                        <option>Checking</option>
                        <option>Saving</option>
                      </Form.Select>

                    </Form.Group>


                    <Button variant="secondary" onClick={" "}>
                      Confirm
                    </Button>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>

            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Credit 2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>



      <h1> EXPERIMENTAL </h1>
      <tbody>{rows}</tbody>

      <h1> modularize </h1>

      <h1>Checking Accounts</h1>
      {checkings}

      <h1>Saving Accounts</h1>
      {savings}

      <h1>Credit Accounts</h1>
      {credits}



      <AnimalCard
          name="name"
          scientificName="scientificName"
          size="size"
        />

        <h1> testing </h1>
        <tbody>{tests}</tbody>


      <SavingAccord
          acc_num="134"
      />

    </div>
  );
}

export default AccountPage;
