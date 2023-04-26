import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import CheckingAccord from "./AccComponents/checkingAccord.js";
import SavingAccord from "./AccComponents/savingAccord.js";
import CreditAccord from "./AccComponents/creditAccord.js";

import AnimalCard from "./test";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import axios from "axios";

import { useLocation } from "react-router-dom";

import "./account.css";

{
  /* for formatting form in modal popup, shelved for now

  import Modal from "react-bootstrap/Modal";
  import Collapse from "react-bootstrap/Collapse";
*/
}

// for how to add multiple events to a single button
// https://upmostly.com/tutorials/adding-multiple-functions-inside-a-single-onclick-event-handler

function AccountPage() {
  console.log("NEW");


  let endpoint = "http://localhost:5001/atms";
  // Access the passed data from useLocation hook
  const location = useLocation();
  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const id = localStorage.getItem("userId");
  const uuid = localStorage.getItem("uuid");
  // Use the token for authentication or other purposes
  // ...

  // Render the data in your component
  console.log("frontend account.js")
  console.log(id ?? "No id found"); // Use nullish coalescing operator to display a default value
  console.log(token ?? "No token found");
  console.log(email ?? "No email found");
  console.log(uuid ?? "No uuid found");





  const [checkingAccounts, setCheckingAccounts] = useState([]);
  const [savingAccounts, setSavingAccounts] = useState([]);
  const [creditAccounts, setCreditAccounts] = useState([]);

  const getAllAccounts = () => {
    console.log("get all account info");

    fetch("http://localhost:5001/api/clients/me/accounts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
    .then(response => {
      if(!response.ok){
        console.log(response);
        throw new Error(response.statusText);
      }
      console.log("getAllAccounts");
      return response.json();
    })
    .then(data => {
      console.log(data);
      //console.log(data.accounts[1]);
      console.log(`number of accounts: ${data.accounts.length}`);
      //window.accNum = data.accounts.length;
      //console.log(`accNum inside ${accNum}`);

      const tempCheckingAccounts = [];
      const tempSavingAccounts = [];
      const tempCreditAccounts = [];

      for(let i=0; i<data.accounts.length; i++){
        console.log(data.accounts[i]);
        console.log(`type ${data.accounts[i].type}`);
        console.log(typeof data.accounts[i].type);

        //populate temporary arrays with different account types
        if(data.accounts[i].type === 'Checking'){
          console.log("push checking");
          tempCheckingAccounts.push(<CheckingAccord
                                      acc_num={data.accounts[i].id}
                                      rout_num={data.accounts[i].routingNumber}
                                      balance={data.accounts[i].balance}
                                      token={token}
                                    />);
        }
        else if(data.accounts[i].type === 'Saving'){
          console.log("push saving");
          tempSavingAccounts.push(<SavingAccord
                                    acc_num={data.accounts[i].id}
                                    rout_num={data.accounts[i].routingNumber}
                                    balance={data.accounts[i].balance}
                                    token={token}
                                  />);
        }
        else if(data.accounts[i].type === 'Credit'){
          console.log("push credit");
          tempCreditAccounts.push(<CreditAccord
                                    acc_num={data.accounts[i].id}
                                    rout_num={data.accounts[i].routingNumber}
                                    balance={data.accounts[i].balance}
                                    token={token}
                                  />);
        }
        else {
          throw new Error("invalid account type");
        }
      }
      //transfer arrays containing accounts to global arrays
      setCheckingAccounts(tempCheckingAccounts);
      setSavingAccounts(tempSavingAccounts);
      setCreditAccounts(tempCreditAccounts);

    })

  }

  useEffect(() => {
    getAllAccounts();
  }, []);


  const [accounts, setAccounts] = useState([])


  // modal popup for account creation
  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);


  // for account creation dropdown in modal popup
  const [selectAccount, setSelectAccount] = useState();

  const createAccount = () => {
    // close modal
    setModalShow(false);

    const type = selectAccount;
    const balance = 0.0;

    console.log(`create account type: ${type}`);

    // create account depending on value in dropdown
    fetch("http://localhost:5001/api/clients/me/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ type, balance }),
    })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error(response.statusText);
      }
      console.log("account created");
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    getAllAccounts();
  }




  /*
  const fetchAccountData = () => {
    fetch("http://localhost:5001/api/clients/me/accounts/2")
      .then(response => {
        console.log("hi");
        console.log(response);
        return response.json()
      })
      .then(data => {
        //console.log(data);
        setAccounts(data)
      })
  }

  useEffect(() => {
    fetchAccountData()
  }, [])*/



  const fetchAccountData = () => {
    fetch(`http://localhost:5001/api/clients/me/accounts/${uuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // assuming you have a token for authentication
      }
    })
    .then(response => {

      console.log("gpt hi");
      if (!response.ok) {
        console.log(response);
        throw new Error(response.statusText);
      }
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  }



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


  //old code for testing adding accounts using loops
  //completely outdated and delete before submission
  /*
  const checkings = [];
  let numcheckings = 2;
  for (let i = 0; i < numcheckings; i++) {
    checkings.push(<CheckingAccord acc_num={i} />);
  }

  const savings = [];
  let numsavings = 2;
  for (let i = 0; i < numsavings; i++) {
    savings.push(<SavingAccord acc_num={i} />);
  }

  const credits = [];
  let numcredits = 2;
  for (let i = 0; i < numcredits; i++) {
    credits.push(<CreditAccord acc_num={3 * i} />);
  }
  */

  // testing file upload
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [imageName, setImageName] = useState();

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);

    const result = await axios.post("/backend/imageDeposit/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setImageName(result.data.imageName);
  };



  // HTML Starts here
  return (
    //everything must go in between the "bod" div
    <div className="bod">



      {/* comments are showing for some reason
       use for loop with amount of accounts to determine
       how many accordion tabs to have */}
      <p>account number: {id}</p>
      <p>email = {email} </p>

      {/*
      <button onClick={addChecking}>Create Account</button>
      */}

      <Button variant="primary" onClick={handleModalShow}>
        Create Account
      </Button>

      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Account Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Create Account: {selectAccount}</h1>
          <select value={selectAccount} onChange={e=>setSelectAccount(e.target.value)}>
            <option></option>
            <option>Checking</option>
            <option>Saving</option>
            <option>Credit</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={createAccount}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>


      {/*
      <button onClick={getAllAccounts}>getAccounts</button>
      */}

      <p>{accounts.account_number}</p>


      <h1>Checking Accounts</h1>
      {checkingAccounts}

      <h1>Saving Accounts</h1>
      {savingAccounts}

      <h1>Credit Accounts</h1>
      {creditAccounts}

    </div>
  );
}

export default AccountPage;
