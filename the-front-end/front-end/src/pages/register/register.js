import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
let theAge;

// helper function for age validation
function checkAge(dob) {
  // Convert the input DOB string to a Date object
  const dobDate = new Date(dob);

  // Get the current date
  const currentDate = new Date();

  // Calculate the age by subtracting the year and month of birth from the current year and month
  let age = currentDate.getFullYear() - dobDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const dobMonth = dobDate.getMonth();
  if (
    currentMonth < dobMonth ||
    (currentMonth === dobMonth && currentDate.getDate() < dobDate.getDate())
  ) {
    // Reduce the age by 1 if the current month is less than the month of birth,
    // or if the months are the same but the current day is less than the day of birth
    age--;
  }
  theAge = age;
  // Check if the age is greater than or equal to 15
  if (age >= 15) {
    return true;
  } else {
    return false;
  }
}
function RegistrationPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [dob, setDob] = useState("");
  const [state, setState] = useState("");
  const [states, setStates] = useState("");
  const [selectedState, setSelectedState] = useState("");

  console.log(dob);

  let hardcodedApiKey = "http://localhost:5001/api/clients/signup";
  const statesList = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" },
  ];

  const handleChangeState = (event) => {
    setSelectedState(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(typeof dob);

    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
      return;
    }
    if (checkAge(dob)) {
      let age = theAge;

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
            dob,
            securityQuestion,
            securityAnswer,
            phoneNumber,
            recoveryEmail,
            zipcode,
            city,
            street,
            //age,
            state: selectedState,
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
      } catch (error) {
        console.error(error);
        // Handle the error
      }
    } else {
      alert("must be 15 or older to register");
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
            value={dob}
            onChange={(e) => setDob(e.target.value)}
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
        <label>
          Zip Code:
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          Street:
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </label>
        <label>
          State:
          <select value={selectedState} onChange={handleChangeState}>
            <option value="">Select a state</option>
            {statesList.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
