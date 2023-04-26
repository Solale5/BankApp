import React, { useState, Component } from "react";
import { Link } from "react-router-dom";

import axios from 'axios';
import {uploadFile} from 'react-s3';
import AWS from 'aws-sdk';

import Accordion from "react-bootstrap/Accordion";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import Button from "react-bootstrap/Button";


AWS.config.update({
  accessKeyId: 'AKIA3FPU3UHCJEBJ7U5S',
  secretAccessKey: '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',
  region: 'us-west-1',
  signatureVersion: 'v4',
});


export default function CheckingAccord({
  acc_num
}) {


  //// NOTE:
    // e.preventDefault(); prevents page from reloading on submit


    //handle Transfer requests
    const [checkingTransferAccNum, setCheckingTransferAccNum] = useState();
    const [checkingTransferRoutNum, setCheckingTransferRoutNum] = useState();
    const [checkingTransferAmount, setCheckingTransferAmount] = useState();

    const handleCheckingTransferSubmit= (e) => {
      console.log("Checking transfer request");
      console.log(`checking transfer account number: ${checkingTransferAccNum}`);
      console.log(`checking transfer routing number: ${checkingTransferRoutNum}`);
      console.log(`checking transfer amount: ${checkingTransferAmount}`);

      //connect to backend here

      e.preventDefault();
    }

    //handle Withdraw requests
    const [checkingWithdrawAmount, setCheckingWithdrawAmount] = useState();

    const handleCheckingWithdrawSubmit = (e) => {
      console.log("Checking withdraw request");
      console.log(`checking withdraw amount ${checkingWithdrawAmount}`);

      //connect to backend here

      e.preventDefault();
    }


    //handle Desosit requests
    const [checkingDepositAmount, setCheckingDepositAmount] = useState();

    const handleCheckingDepositSubmit = (e) => {
      console.log("Checking deposit request");
      console.log(`checking desposit amount: ${checkingDepositAmount}`);

      e.preventDefault();

    }


    const s3 = new AWS.S3();
    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null);

    const handleFileSelect = (e) => {
      //setFile(e.target.files[0]);


      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    /*
    //upload to AWS bucket
    //idk if necessary
    const uploadToS3 = async () => {
      if (!file) {
        return;
      }
      const params = {
        Bucket: 'bankapppicturebucket',
        Key: `${Date.now()}.${file.name}`,
        Body: file
      };
      const { Location } = await s3.upload(params).promise();
      setImageUrl(Location);
      console.log('uploading to s3', Location);
    }
    */


    /*
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileInput = (e) => {

        setSelectedFile(e.target.files[0]);
    }
    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))

    }*/

    //console.log("image");


    return(
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>...{acc_num}</Accordion.Header>
          <Accordion.Body>
            <Accordion>
              <h1>Balance: $</h1>
              <Accordion.Item eventKey="1T">
                <Accordion.Header>Transfer</Accordion.Header>
                <Accordion.Body>
                  <form onSubmit={e => {handleCheckingTransferSubmit(e)}}>
                    <label>Account Number</label>
                    <input
                      name='checking_transfer_account_number'
                      placeholder='Account Number'
                      type='number'
                      value={checkingTransferAccNum}
                      onChange={e => setCheckingTransferAccNum(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <label>Routing Number</label>
                    <input
                      name='checking_transfer_routing_number'
                      placeholder='Routing Number'
                      type='number'
                      value={checkingTransferRoutNum}
                      onChange={e => setCheckingTransferRoutNum(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <label>Amount</label>
                    <input
                      name='checking_transfer_amount'
                      placeholder='$Amount'
                      type='number'
                      value={checkingTransferAmount}
                      onChange={e => setCheckingTransferAmount(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <button type="submit">Transfer</button>
                  </form>

                  {/* doing too much with React-Bootstrap
                  <Form>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="CheckingAccNum"
                    >
                      <Col sm={10}>
                        <Form.Control
                          type="number"
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
                  */}
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1W">
                <Accordion.Header>Withdraw</Accordion.Header>
                <Accordion.Body>
                  <form onSubmit={e => {handleCheckingWithdrawSubmit(e)}}>
                    <label>Amount</label>
                    <input
                      name='checking_withdraw_amount'
                      placeholder='$Amount'
                      type='number'
                      value={checkingWithdrawAmount}
                      onChange={e => setCheckingWithdrawAmount(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <button type="submit">Withdraw</button>
                  </form>

                  {/*
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
                  */}
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1D">
                <Accordion.Header>Deposit</Accordion.Header>
                <Accordion.Body>


                {/*
                  <Form onSubmit={submit}>
                    <Form.Group className="mb-3" controlId="CheckingDepositImage">
                      <Form.Label>Please upload image of Check</Form.Label>
                      <Form.Control
                        filename={file}
                        type="file"
                        onChange={e => setFile(e.target.files[0])}
                      />
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

                    <Button variant="secondary" type="submit">
                      Deposit
                    </Button>
                  </Form>
                  */}

                  <form onSubmit={e => {handleCheckingDepositSubmit(e)}}>
                    <label>Input Check Image</label>
                    <input
                      name='checking_deposit_check_image'
                      type='file'
                      onChange={handleFileSelect}
                    />
                    <h5>AND</h5>
                    <label>Input Deposit Amount:</label>
                    <input
                      name='checking_deposit_amount'
                      placeholder='$Amount'
                      type='number'
                      value={checkingDepositAmount}
                      onChange={e => setCheckingDepositAmount(e.target.value)}
                    />
                    <br/>
                    <br/>
                    {/* this line for AWS Bucket
                      <button onClick={uploadToS3} type="submit">Deposit</button>*/}
                    <button type="submit">Deposit</button>
                  </form>

                  <h3>Check Image:</h3>
                  {imageUrl && <img src={imageUrl} alt="Check Image Not Found" />}

                  {/*
                  <input type="file" onChange={handleFileSelect} />
                  <h5>Input Deposit Amount:</h5>
                  <input type="number" />
                  <button onClick={uploadToS3}>Submit</button>
                  {imageUrl && (
                      <img src={imageUrl} alt="uploaded" />
                  )}
                  */}


                  {/* if want to display image on site
                  get rid of forms and add this to the bottom



                  */}


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
