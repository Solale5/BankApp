import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css";
function Login({ onLoginStatusChange }) {
  // Inside your login component
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let hardcodedApiKey = "http://localhost:5001/api/clients/login";

  const handleSubmit = async (e) => {
    console.log(username);
    console.log(password);
    let email = username;
    e.preventDefault();

    try {
      const response = await fetch(`${hardcodedApiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
      // Do something with the response data
      const data = await response.json();
      console.log("login.js:");
      console.log("data: " + data);
      console.log("userID: " + data.userId);
      console.log("email: " + data.email);
      console.log("token: " + data.token);
      console.log("uuid: " + data.uuid);
      // Store the token securely in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("email", data.email);
      localStorage.setItem("uuid", data.uuid);

      // Navigate to the /account route
      // After successful login

      localStorage.setItem("isLoggedIn", true);
      onLoginStatusChange(true);
      navigate("/account");
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">email:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
