import React, { useEffect, useState } from "react";
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


  let hardcodedApiKey = "http://localhost:5001";


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
