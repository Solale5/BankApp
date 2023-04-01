import React, { useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Collapse from "react-bootstrap/Collapse";

/* for formatting form in modal popup, shelved for now */

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

// import "./home.css";

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

  {
    /*
   const toggle = () => {
     setOpen(!open);
   };
   */
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
            //buttons
            <div className="d-grid gap-2">
              <Button variant="dark" size="sm" onClick={handleShow}>
                Transfer
              </Button>{" "}
              <Button
                variant="dark"
                size="sm"
                onClick={() => setOpen(!open)}
                aria-controls="withdraw-collapse"
                aria-expanded={open}
              >
                Withdraw
              </Button>{" "}
              <Collapse in={open}>
                <div id="withdraw-collapse">collapse Withdraw</div>
              </Collapse>
              <Button
                variant="dark"
                size="sm"
                onClick={() => setOpen(!open)}
                aria-controls="deposit-collapse"
                aria-expanded={open}
              >
                Deposit
              </Button>{" "}
              <Collapse in={open}>
                <div id="deposit-collapse">collapse deposit</div>
              </Collapse>
              <Button variant="dark" size="sm">
                Information
              </Button>{" "}
            </div>
            // modal popups
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title> Transfer To: </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="checkingAccNum"
                  >
                    <Col sm={10}>
                      <Form.Control type="text" placeholder="Account Number" />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="checkingRoutNum"
                  >
                    <Col sm={10}>
                      <Form.Control type="text" placeholder="Routing Number" />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="checkingAmount"
                  >
                    <Form.Label column sm={2}>
                      $
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control type="text" placeholder="Amount" />
                    </Col>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Transfer
                </Button>
              </Modal.Footer>
            </Modal>
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
                      controlId="checkingAccNum"
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
                      controlId="checkingRoutNum"
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
                      controlId="checkingAmount"
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
                      controlId="checkingAccNum"
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
                      controlId="checkingRoutNum"
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
                      controlId="checkingAmount"
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
                      controlId="checkingAmount"
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
                      controlId="checkingAccNum"
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
                      controlId="checkingRoutNum"
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
                      controlId="checkingAmount"
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
                      controlId="checkingAccNum"
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
                      controlId="checkingRoutNum"
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
                      controlId="checkingAmount"
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
                      controlId="checkingAmount"
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
                      controlId="checkingAccNum"
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
                      controlId="checkingRoutNum"
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
                      controlId="checkingAmount"
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
                      controlId="checkingAccNum"
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
                      controlId="checkingRoutNum"
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
                      controlId="checkingAmount"
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
                      controlId="checkingAmount"
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
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Credit 1</Accordion.Header>
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
    </div>
  );
}

export default AccountPage;
