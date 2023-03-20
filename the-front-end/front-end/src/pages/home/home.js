import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
function HomePage() {
  return (
    <div className="bod">
      <h1>Welcome to the Bank</h1>
      <p>Please login or register to access your account.</p>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
