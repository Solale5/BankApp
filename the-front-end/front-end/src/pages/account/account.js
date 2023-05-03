import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import CheckingAccord from "./AccComponents/checkingAccord.js";
import SavingAccord from "./AccComponents/savingAccord.js";
import CreditAccord from "./AccComponents/creditAccord.js";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import axios from "axios";

import { useLocation } from "react-router-dom";

import "./account.css";


function AccountPage() {
  console.log("NEW");


  useEffect(() => {
    getAllAccounts();
  }, []);

  let endpoint = process.env.REACT_APP_BACKEND_URL + "/atms";
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
  console.log("frontend account.js");
  console.log(id ?? "No id found"); // Use nullish coalescing operator to display a default value
  console.log(token ?? "No token found");
  console.log(email ?? "No email found");
  console.log(uuid ?? "No uuid found");

  const [checkingAccounts, setCheckingAccounts] = useState([]);
  const [savingAccounts, setSavingAccounts] = useState([]);
  const [creditAccounts, setCreditAccounts] = useState([]);
  const [accNums, setAccNums] = useState([]);

  const getAllAccounts = async () => {
    console.log("get all account info");

    fetch(process.env.REACT_APP_BACKEND_URL + "/api/clients/me/accounts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error(response.statusText);
        }
        console.log("getAllAccounts");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        //console.log(data.accounts[1]);
        console.log(`number of accounts: ${data.accounts.length}`);
        //window.accNum = data.accounts.length;
        //console.log(`accNum inside ${accNum}`);

        const tempCheckingAccounts = [];
        const tempSavingAccounts = [];
        const tempCreditAccounts = [];
        const tempAccNums = [];

        for (let i = 0; i < data.accounts.length; i++) {
          console.log(data.accounts[i]);
          console.log(`type ${data.accounts[i].type}`);
          console.log(typeof data.accounts[i].type);

          tempAccNums.push(data.accounts[i].id);

          //populate temporary arrays with different account types
          if (data.accounts[i].type === "Checking") {
            console.log("push checking");
            tempCheckingAccounts.push(
              <CheckingAccord
                acc_num={data.accounts[i].id}
                rout_num={data.accounts[i].routingNumber}
                balance={data.accounts[i].balance}
                token={token}
              />
            );
          } else if (data.accounts[i].type === "Saving" || data.accounts[i].type === "Savings") {
            console.log("push saving");
            tempSavingAccounts.push(
              <SavingAccord
                acc_num={data.accounts[i].id}
                rout_num={data.accounts[i].routingNumber}
                balance={data.accounts[i].balance}
                token={token}
              />
            );
          } else if (data.accounts[i].type === "Credit") {
            console.log("push credit");
            tempCreditAccounts.push(
              <CreditAccord
                acc_num={data.accounts[i].id}
                rout_num={data.accounts[i].routingNumber}
                balance={data.accounts[i].balance}
                token={token}
              />
            );
          } else {
            throw new Error("invalid account type");
          }
          //getAllAccounts();
        }
        //transfer arrays containing accounts to global arrays
        setCheckingAccounts(tempCheckingAccounts);
        setSavingAccounts(tempSavingAccounts);
        setCreditAccounts(tempCreditAccounts);
        setAccNums(tempAccNums);
      });
  };



  const [accounts, setAccounts] = useState([]);

  // modal popup for account creation
  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  // modal popup for account deletion
  const [modalShow2, setModalShow2] = useState(false);

  const handleModalClose2 = () => setModalShow2(false);
  const handleModalShow2 = () => setModalShow2(true);

  // for account creation dropdown in modal popup
  const [selectAccount, setSelectAccount] = useState();



  const createAccount = async () => {
    // close modal
    setModalShow(false);

    getAllAccounts();

    const type = selectAccount;
    const balance = 0.0;

    console.log(`create account type: ${type}`);

    // create account depending on value in dropdown
    fetch(process.env.REACT_APP_BACKEND_URL + "/api/clients/me/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type, balance }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error(response.statusText);
        }
        console.log("account created");
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
    getAllAccounts();
    //window.location.reload();
  };


  const accDropdownOptions = accNums.map((accNums) => (
    <option key={accNums} value={accNums}>
      {accNums}
    </option>
  ));


  // for account deletion dropdown
  const [selectAccountClose, setSelectAccountClose] = useState();

  //close account
  const closeAccount = (e) => {
    getAllAccounts();
    //const closeAccNum = selectAccountClose;

    fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/api/clients/me/accounts/${selectAccountClose}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // assuming you have a token for authentication
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error(response.statusText);
        }
        console.log("close checking account");
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
      getAllAccounts();
      //window.location.reload();

  }


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

      <p>account number: {id}</p>
      <p>email = {email} </p>


      <Button variant="primary" onClick={handleModalShow}>
        Create Account
      </Button>

      <Button variant="primary" onClick={handleModalShow2}>
        Close Account
      </Button>

      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Account Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Create Account: {selectAccount}</h1>
          <select
            value={selectAccount}
            onChange={(e) => setSelectAccount(e.target.value)}
          >
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

      <Modal show={modalShow2} onHide={handleModalClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Close Account</h1>
          <select
            value={selectAccountClose}
            onChange={(e) => setSelectAccountClose(e.target.value)}
          >
            <option value=""></option>
            {accDropdownOptions}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeAccount}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


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
