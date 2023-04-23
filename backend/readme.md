# Spartans Bank - Backend documentation

This is the main docs for Sparatans-Bank backend API.

## Tools Used

- Nodejs
- Express
- MySQL hosted on AWS RDS
- Sequelize
- Multiple Nodejs packages

## Spartans-Bank Description

The Banking App is an application that allows customers to access their banking information and perform various tasks such as viewing their account balances, transferring funds between accounts, paying bills, and managing their personal information. The application is designed to provide a simple and user-friendly interface that can be accessed from any device with an internet connection.

## Development Environment

To use Spartans-Bank backend API, you need to do the following:

- install Node.js on your machine (version 15+)
- MySQL database configurations in config/config.json
- run `npm install` while being in the backend directory to install all the required dependencies
- run `node app.js`

### Please Note: `host` can be either the server endpoint or `http://localhost:3000` if you are running on a local machine for development purposes

## USER Endpoints

#### User Signup

- ##### Endpoint: host/api/clients/signup
- ##### Request Type: POST
- ##### Request Body Example:

```
    {
    "name": "Mordan",
    "age": "16",
    "password": "welcomdsf",
    "securityQuestion": "what is your  mother's name?",
    "securityAnswer": "jane",
    "phoneNumber": "4082348721",
    "email": "ahmed.abdelsalam.sa@gmail.com",
    "recoveryEmail": "mordanjai@gmail.com",
    "street": "Washington St.",
    "city": "San Jose",
    "state": "CA"
    }
```

- ##### Required request information:

  All fields in the above request body example must be provided. <br>

- #### Response of the request:
  - A user will be created but still not yet verified. Other failure messages will be provided according to the error <br>
  - A verification email will be sent to the user mailbox [check spam if you are using gmail] <br>
    PS: the link provided in the email should be the frontend endpoint that the user will access to verify the email. Frontend should fire a request to the backend to verify the email.
  - the user information and the signupToken will be provided in the body of the response.

#### User Email Verification

- ##### Endpoint: host/api/clients/verify/{{signupToken}}

<br>
PS: the signupToken would be sent in the verification email.

- ##### Request Type: POST

- #### Response of the request:
  - `Email verifified successfully` will be provided on success and other messages on failure according to the error <br>
##
#### User Login

- ##### Endpoint: host/api/clients/login
- ##### Request Type: POST
- ##### Request Body Example:

```
    {
    "email": "ahmed.abdelsalam.sa@gmail.com",
     "password": "welcomdsf",
     "securityAnswer": "jane"
    }
```

- ##### Required request information:

  All fields in the above request body example must be provided <br>

- #### Response of the request:
  - the user information and the session token will be provided and will be attached to any further request to do any operation such as depositing or transferring money or updating the user information.
