import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AutomatePage() {

  const handleClick = event => {
    //handle submission here
  }


  return (
    <div className="bod">
      <h1> Set up Automated Payment </h1>

      <Form>
        <Form.Group>
          <Form.Label>Paying Account</Form.Label>
          <Form.Control type="number" placeholder="routing number" />
          <Form.Control type="number" placeholder="account number" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Receiving Account</Form.Label>
          <Form.Control type="number" placeholder="routing number" />
          <Form.Control type="number" placeholder="account number" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Details</Form.Label>
          <Form.Control type="number" placeholder="amount" />
          <Form.Control type="date" placeholder="date" />
        </Form.Group>

        <Button onClick={handleClick}>Set Up</Button>
      </Form>



    </div>




  );

}

export default AutomatePage
