import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

function RegistrationPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [age, setAge] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  let hardcodedApiKey = "http://localhost:5001/api/clients/signup";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${hardcodedApiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
          email,
          age,
          securityQuestion,
          securityAnswer,
          phoneNumber,
          recoveryEmail,
        }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Registration failed");
      }

      const data = await response.json();

      // Do something with the response data

      console.log(data);
      navigate("/login");
      if (data.registeredUser == name) {
        // window.location.href = "/login";
      }
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };
  return (
    <div>
      <h1>Register for an Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </label>
        <label>
          Birthday:
          <input
            type="date"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>
        <label>
          Security Question:
          <select
            value={securityQuestion}
            onChange={(e) => setSecurityQuestion(e.target.value)}
            required
          >
            <option value="">Select a security question</option>
            <option value="q1">What is your mother's maiden name?</option>
            <option value="q2">What is the name of your first pet?</option>
            <option value="q3">What city were you born in?</option>
          </select>
        </label>
        <label>
          Answer:
          <input
            type="text"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Recovery Email:
          <input
            type="email"
            value={recoveryEmail}
            onChange={(e) => setRecoveryEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
