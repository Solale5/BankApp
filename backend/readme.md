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

##

#### User Email Verification

- ##### Endpoint: host/api/clients/verify/{{signupToken}}

<br>
PS: the signupToken would be sent in the verification email which should be used here

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
  - the user information and the session token will be provided and must be attached to any further request to do any operation such as depositing or transferring money or updating the user information.

##

#### User Logout

- ##### Endpoint: host/api/clients/logout
- ##### Request Type: POST

- ##### Required request information:

  Authorization Token returned when you logged in must be provided in the header section of the request.

- #### Response of the request:
  - the user will be logged out and the session token will be removed from the database. The status will be 200 on success.

##

#### User LogoutAll

- ##### Endpoint: host/api/clients/logoutAll
- ##### Request Type: POST

- ##### Required request information:

  Authorization Token returned when you logged in must be provided in the header section of the request.

- #### Response of the request:
  - the user will be logged out from all devices. The status will be 200 on success.

##

#### Get the information of a user

- ##### Endpoint: host/api/clients/me
- ##### Request Type: GET

- ##### Required request information:
  Authorization Token returned when you logged in must be provided in the header section of the request.<br>
- #### Response of the request:
  The user information will be provided on success.

##

#### Update user profile

- ##### Endpoint: host/api/clients/me
- ##### Request Type: PATCH
- ##### Request Body Example:

```
    {
    "name": "Mordan",
    "age": "16",
    "securityAnswer": "jane",
    "phoneNumber": "4082348721",
    "recoveryEmail": "mordanjai@gmail.com",
    "street": "Washington St.",
    "city": "San Jose",
    "state": "CA"
    }
```

- ##### Required request information:
- Authorization Token returned when you logged in must be provided in the header section of the request.
- A combination of fields from the above request body example must be provided. <br>
  PS: You can't update either the email or the password or the security question. <BR>
  To update the password, use `host/password-reset` endpoint.

- #### Response of the request:
  The updated user information will be provided on success.

##

#### Delete user profile

- ##### Endpoint: host/api/clients/me
- ##### Request Type: DELETE

- ##### Required request information:
  Authorization Token returned when you logged in must be provided in the header section of the request.<br>
- #### Response of the request:
  Status 200 on success.

## Account Endpoints

##

#### Add a new account

- ##### Endpoint: host/api/clients/me/accounts/
- ##### Request Type: POST
- ##### Request Body Example:

```
  {
    "type": "Credit",
    "balance": 1000.0
  }
```

PS: Possible values for type are `Credit` or `Saving` or `Debit`

- ##### Required request information:
- Authorization Token returned when you logged in must be provided in the header section of the request.
- type: required <br>
  balance: optional <br>
- #### Response of the request:
  The new account infomation will be returned on success.<br>
  You need to keep the accountID, as you might need it later to do some operations on the created account.

##

#### Get the information of a specific account

- ##### Endpoint: host//api/clients/me/accounts/{{accountID}}
- ##### Request Type: GET
- ##### Required request information:
- Authorization Token returned when you logged in must be provided in the header section of the request.
- #### Response of the request:
  The account infomation will be returned on success.

##

#### Get the information of a all accounts

- ##### Endpoint: host//api/clients/me/accounts/
- ##### Request Type: GET
- ##### Required request information:
- Authorization Token returned when you logged in must be provided in the header section of the request.
- #### Response of the request:
  All accounts infomation under the currently loggedin user will be returned on success.

##

#### Deposit to an account

- ##### Endpoint: host/api/clients/me/accounts/{{accountID}}/deposit
- ##### Request Type: PATCH
- ##### Request Body Example:

```
  {
    "balance": 1000.0
  }
```

- ##### Required request information:
- Authorization Token returned when you logged in must be provided in the header section of the request.
- balance field.
- #### Response of the request:
  The account infomation will be returned on success.

##

#### Withdraw from an account

- ##### Endpoint: host/api/clients/me/accounts/{{accountID}}/withdraw
- ##### Request Type: PATCH
- ##### Request Body Example:

```
  {
    "balance": 200.0
  }
```

- ##### Required request information:
- Authorization Token returned when you logged in must be provided in the header section of the request.
- balance field.
- #### Response of the request:
  The account infomation will be returned on success.
