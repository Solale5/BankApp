import "./manager.css";
import React, { useState, useEffect } from "react";

function BankManagerReports() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReportData();
  }, []);

  async function fetchReportData() {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/clients/me/reports/",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log(data.body);
      setReportData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  }

  function handleRefresh() {
    setLoading(true);
    setError(null);
    fetchReportData();
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!reportData) {
    return null;
  }

  return (
    <div className="tile-container">
      <div className="tile">
        <div className="tile-title">Number of Users</div>
        <div className="tile-value">{reportData.number_of_users}</div>
      </div>
      <div className="tile">
        <div className="tile-title">Number of Accounts</div>
        <div className="tile-value">{reportData.number_of_accounts}</div>
      </div>
      <div className="tile">
        <div className="tile-title">Total Balance</div>
        <div className="tile-value">{reportData.total_balance.toFixed(2)}</div>
      </div>
      <div className="tile">
        <div className="tile-title">Average Balance</div>
        <div className="tile-value">
          {Math.round(reportData.average_balance.toFixed(2) * 100) / 100}
        </div>
      </div>
      <div className="tile">
        <div className="tile-title">Total Transactions</div>
        <div className="tile-value">
          {reportData.total_number_of_transactions}
        </div>
      </div>
      <div className="tile">
        <div className="tile-title">Number of Deposits</div>
        <div className="tile-value">{reportData.num_deposit}</div>
      </div>
      <div className="tile">
        <div className="tile-title">Number of Withdrawals</div>
        <div className="tile-value">{reportData.num_withdraw}</div>
      </div>
      <div className="tile">
        <div className="tile-title">Number of Transfers</div>
        <div className="tile-value">{reportData.num_transfer}</div>
      </div>
      <button className="refresh-button" onClick={handleRefresh}>
        Refresh
      </button>
    </div>
  );
}

export default BankManagerReports;
