import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css";
function Login() {
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
      console.log(data);
      console.log(data.userId);
      console.log(data.email);
      console.log(data.token);
      // Pass the data as state to the /account route and navigate to it
      navigate("/account", {
        state: { id: data.userId, token: data.token, email: data.email },
      });
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
