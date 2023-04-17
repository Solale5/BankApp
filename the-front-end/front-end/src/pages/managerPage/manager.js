import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ManagerPage() {

  const [zipShow, setZipShow] = useState(false);
  const [balShow, setBalShow] = useState(false);
  const [accShow, setAccShow] = useState(false);

  const [submitShow, setSubmitShow] = useState(false);

  const handleZipClick = event => {
    setZipShow(curr => !curr);

    setBalShow(false);
    setAccShow(false);
  }

  const handleBalanceClick = event => {
    setBalShow(curr => !curr);

    setZipShow(false);
    setAccShow(false);
  }

  const handleSpecAccClick = event => {
    setAccShow(curr => !curr);

    setZipShow(false);
    setBalShow(false);
  }

  const handleSubmit = event => {
    setSubmitShow(true);
  }


  return (
    <div className="bod">
      <h1> Sort By: </h1>
      <DropdownButton id="SearchBy" title="Filter">
        <Dropdown.Item onClick={handleZipClick}>Zipcode</Dropdown.Item>
        <Dropdown.Item onClick={handleBalanceClick}>Balance Range</Dropdown.Item>
        <Dropdown.Item onClick={handleSpecAccClick}>Specific Account</Dropdown.Item>
      </DropdownButton>


      {/* hidden form elements depending on what dropdown is active */}

      {zipShow && (
        <div>
          <h1>zipfield</h1>
          <Form>
            <Form.Group>
              <Form.Label>Search by zipcode</Form.Label>
              <Form.Control type="number" placeholder="enter zipcode" />
            </Form.Group>
            <Button onClick={handleSubmit}>Search</Button>
          </Form>

        </div>

      )}

      {balShow && (
        <div>
          <Form>
            <Form.Group>
              <Form.Label>Balance Range</Form.Label>
              <Form.Control type="number" placeholder="from" />
              <Form.Control type="number" placeHolder="to"/>
            </Form.Group>
            <Button onClick={handleSubmit}>Search</Button>
          </Form>
        </div>
      )}

      {accShow && (
        <div>
          <Form>
            <Form.Group>
              <Form.Label>Search for Specific Account</Form.Label>
              <Form.Control type="number" placeholder="routing number" />
              <Form.Control type="number" placeholder="account number" />
            </Form.Group>
            <Button onClick={handleSubmit}>Search</Button>
          </Form>
        </div>
      )}


      {/* accounts found in search will be displayed here */}

      {submitShow && (
        <div>

          <h1> Results: </h1>


        </div>
      )}



    </div>

  );
}



export default ManagerPage;
