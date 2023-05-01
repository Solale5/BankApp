import axios from "axios";
import React, { useState, useEffect } from "react";

function AutomatePage() {
  const [creditAccounts, setCreditAccounts] = useState([]);
  const [theAccounts, setAccounts] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `/api/clients/me/accounts/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        let creditAccounts = [];
        let otherAccounts = [];
        let accounts = response.data.accounts;
        for (let i = 0; i < accounts.length; i++) {
          const account = accounts[i];
          if (account.type === "Credit") {
            console.log(account);
            creditAccounts.push(account.id);
          } else {
            otherAccounts.push(account.id);
          }
        }
        setCreditAccounts(creditAccounts);
        setAccounts(otherAccounts);
      })
      .catch((error) => {
        console.log(error);
        // handle error response
      });
  }, []);

  const [formData, setFormData] = useState({
    accountNumber: "",
    accountID: "",
    amount: "",
    frequency: "",
    minutes: "",
    hour: "",
    day_of_the_week: "",
    day_of_the_month: "",
  });
  console.log(formData);
  console.log(creditAccounts);
  console.log(theAccounts);
  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const minutes = parseInt(formData.minutes);
    const hour = parseInt(formData.hour);
    const dayOfWeek = parseInt(formData.day_of_the_week);
    const dayOfMonth = parseInt(formData.day_of_the_month);

    if (isNaN(minutes) || minutes < 0 || minutes > 59) {
      alert("Minutes must be a number between 0 and 59");
      return;
    }

    if (isNaN(hour) || hour < 0 || hour > 23) {
      alert("Hour must be a number between 0 and 23");
      return;
    }

    if (formData.frequency === "daily") {
      // no further validation needed
    } else if (formData.frequency === "weekly") {
      if (isNaN(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6) {
        alert("Day of the week must be a number between 0 and 6");
        return;
      }
    } else if (formData.frequency === "monthly") {
      if (isNaN(dayOfMonth) || dayOfMonth < 0 || dayOfMonth > 31) {
        alert("Day of the month must be a number between 0 and 31");
        return;
      }
    } else {
      alert("Frequency must be daily, weekly, or monthly");
      return;
    }

    axios
      .patch(
        process.env.REACT_APP_BACKEND_URL +
          `/api/clients/me/accounts/${formData.accountID}/automatepayment`,
        {
          accountNumber: formData.accountNumber,
          amount: formData.amount,
          frequency: formData.frequency,
          minutes: minutes,
          hour: hour,
          day_of_the_week: dayOfWeek,
          day_of_the_month: dayOfMonth,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        alert("payment scheduled");
        // handle success response
      })
      .catch((error) => {
        // handle error response
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Debit account to pay from:
          <select
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleFormChange}
          >
            <option value="">Select account</option>
            {theAccounts.map((account) => (
              <option key={account} value={account}>
                {account}
              </option>
            ))}
          </select>
        </label>
        <label>
          Receiving credit account:
          <select
            name="accountID"
            value={formData.accountID}
            onChange={handleFormChange}
          >
            <option value="">Select account</option>
            {creditAccounts.map((account) => (
              <option key={account} value={account}>
                {account}
              </option>
            ))}
          </select>
        </label>

        <label>
          Amount:
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleFormChange}
          />
        </label>
        <label>
          Frequency:
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleFormChange}
          >
            <option value="">Select frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <label>
          Minutes:
          <input
            type="text"
            name="minutes"
            value={formData.minutes}
            onChange={handleFormChange}
          />
        </label>
        <label>
          Hour:
          <input
            type="text"
            name="hour"
            value={formData.hour}
            onChange={handleFormChange}
          />
        </label>
        <label>
          Day of the Week:
          <input
            type="text"
            name="day_of_the_week"
            value={formData.day_of_the_week}
            onChange={handleFormChange}
          />
        </label>
        <label>
          Day of the Month:
          <input
            type="text"
            name="day_of_the_month"
            value={formData.day_of_the_month}
            onChange={handleFormChange}
          />
        </label>
        <button type="submit">Set Up</button>
      </form>
    </div>
  );
}

export default AutomatePage;
