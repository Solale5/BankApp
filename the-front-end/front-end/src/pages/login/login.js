import React, { useState } from "react";

import "./login.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let hardcodedApiKey = "http://localhost:5001";
  const handleSubmit = async (e) => {
    console.log(username);
    console.log(password);
    let email = "test@gmail.com";
    e.preventDefault();

    try {
      const response = await fetch(`${hardcodedApiKey}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response;

      // Do something with the response data
      console.log(data);
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
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
