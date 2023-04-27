import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css";

function Login({ onLoginStatusChange }) {
  // Inside your login component
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");

  let hardcodedApiKey =
    process.env.REACT_APP_BACKEND_URL + "/api/clients/login";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${hardcodedApiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          email: username,
          securityAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      // Do something with the response data
      const data = await response.json();
      console.log(data);
      // Store the token securely in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("uuid", data.user.uuid);

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
        <label htmlFor="username">Email:</label>
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
      <div>
        <label htmlFor="securityQuestion">Security Question:</label>
        <select
          id="securityQuestion"
          value={securityQuestion}
          onChange={(e) => setSecurityQuestion(e.target.value)}
        >
          <option value="">Select a security question</option>
          <option value="motherMaidenName">
            What is your mother's maiden name?
          </option>
          <option value="firstPetName">
            What is the name of your first pet?
          </option>
          <option value="cityOfBirth">What city were you born in?</option>
        </select>
      </div>
      <div>
        <label htmlFor="securityAnswer">Security Answer:</label>
        <input
          type="text"
          id="securityAnswer"
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
