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

    /*
    // some bs to try to send image to backend
    const [file, setFile] = useState()
    const [description, setDescription] = useState("")
    const [imageName, setImageName] = useState()

    const submit = async event => {
      event.preventDefault()

      const formData = new FormData()
      formData.append("image", file)
      formData.append("description", description)

      const result = await axios.post('/backend/imageDeposit/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
      setImageName(result.data.imageName)
    }
    */
    const s3 = new AWS.S3();
    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null);

    const handleFileSelect = (e) => {
      setFile(e.target.files[0]);
    }
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

    console.log("image");


    return(
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>...{acc_num}</Accordion.Header>
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



                  <input type="file" onChange={handleFileSelect} />
                  <h5>Input Deposit Amount:</h5>
                  <input type="number" />
                  <button onClick={uploadToS3}>Submit</button>
                  {imageUrl && (
                      <img src={imageUrl} alt="uploaded" />
                  )}


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
