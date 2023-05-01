import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import Button from "react-bootstrap/Button";

export default function CreditAccord({ acc_num, rout_num, balance, token }) {

  useEffect(() => {
    transactionHistory();
  }, []);

  // handle credit bill payment
  const [creditPayAccNum, setCreditPayAccNum] = useState();
  const [creditPayRoutNum, setCreditPayRoutNum] = useState();
  const [creditPayAmount, setCreditPayAmount] = useState();

  const handleCreditPaySubmit = (e) => {
    console.log("Credit pay request");

    let balance = parseFloat(creditPayAmount);
    let description = `pay $${creditPayAmount} from account ${creditPayAccNum}
                      to credit account ${acc_num}`;

    fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/api/clients/me/accounts/${acc_num}/withdraw`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // assuming you have a token for authentication
        },
        body: JSON.stringify({ balance, description }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error(response.statusText);
        }
        console.log("saving withdraw");
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });

    fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/api/clients/me/accounts/${creditPayAccNum}/withdraw`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // assuming you have a token for authentication
        },
        body: JSON.stringify({ balance, description }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error(response.statusText);
        }
        console.log("saving withdraw");
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const addToCreditBill = (e) => {
    let balance = 1000.0;
    //console.log(typeof balance);
    let description = `add $1000 to credit bill`;

    fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/api/clients/me/accounts/${acc_num}/deposit`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // assuming you have a token for authentication
        },
        body: JSON.stringify({ balance, description }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error(response.statusText);
        }
        console.log("saving deposit");
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
    //e.preventDefault();
    window.location.reload();
  };

  //close account
  const closeAccount = (e) => {
    fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/api/clients/me/accounts/${acc_num}`,
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
        console.log("close saving account");
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
      window.location.reload();
  }

  const [historyList, setHistoryList] = useState([]);
  //transaction history
  const transactionHistory = () => {
    fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/api/clients/me/transactions/${acc_num}`,
      {
        method: "GET",
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
      //console.log(`transAmt: ${data.transactions[0].transactionAmt}`);
      //console.log(`transType: ${data.transactions[0].transactionType}`);
      console.log(`transDesc: ${data.transactions[0].description}`);

      const tempHistoryList = [];
      for(let i = 0; i< data.transactions.length; i++){
        tempHistoryList.push(data.transactions[i].description + '\n');
      }
      setHistoryList(tempHistoryList);
    });
  }

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {acc_num} --- Due: ${balance.toFixed(2)}
        </Accordion.Header>
        <Accordion.Body>
          <p>Amount Due: ${balance.toFixed(2)}</p>
          <button
            onClick={(e) => {
              addToCreditBill(e);
            }}
          >
            Buy Something
          </button>
          <br />
          <br />

          <Accordion>
            <Accordion.Item eventKey="1P">
              <Accordion.Header>Pay</Accordion.Header>
              <Accordion.Body>
                <form
                  onSubmit={(e) => {
                    handleCreditPaySubmit(e);
                  }}
                >
                  <h3>Pay From:</h3>
                  <label>Account Number</label>
                  <input
                    name="credit_pay_account_number"
                    placeholder="Paying Account Number"
                    type="number"
                    value={creditPayAccNum}
                    onChange={(e) => setCreditPayAccNum(e.target.value)}
                    required
                  />
                  <br />
                  <br />
                  <label>Routing Number</label>
                  <input
                    name="credit_pay_routing_number"
                    placeholder="Paying Routing Number"
                    type="number"
                    value={creditPayRoutNum}
                    onChange={(e) => setCreditPayRoutNum(e.target.value)}
                    required
                  />
                  <br />
                  <br />
                  <label>Amount</label>
                  <input
                    name="credit_pay_amount"
                    placeholder="$Amount"
                    type="number"
                    step="0.01"
                    value={creditPayAmount}
                    onChange={(e) => setCreditPayAmount(e.target.value)}
                    required
                  />
                  <br />
                  <br />
                  <button type="submit">Pay</button>
                </form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1I">
              <Accordion.Header>Information</Accordion.Header>
              <Accordion.Body>
                <h3>Account Number: {acc_num}</h3>
                <h3>Routing Number: {rout_num}</h3>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1H">
              <Accordion.Header>Transaction History</Accordion.Header>
              <Accordion.Body>
                {historyList.map((item, index) => (
                  <div key={index}>{item}</div>))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <br/>
          <button onClick={(e) => {closeAccount(e);}}>Close Account</button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
