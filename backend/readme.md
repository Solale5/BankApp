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

PS: The only possible values for type are `Credit` or `Saving` or `Debit`

- ##### Required request information:
  Authorization Token returned when you logged in must be provided in the header section of the request.
  type: required <br>
  balance: optional <br>
- #### Response of the request:
  The new account infomation will be returned on success.<br>
  You need to keep the accountID, as you might need it later to do some operations on the created account.

##

#### Get the information of a specific account

- ##### Endpoint: host//api/clients/me/accounts/{{accountID}}
- ##### Request Type: GET
- ##### Required request information:
  Authorization Token returned when you logged in must be provided in the header section of the request.
- #### Response of the request:
  The account infomation will be returned on success.

##

#### Get the information of all accounts

- ##### Endpoint: host//api/clients/me/accounts/
- ##### Request Type: GET
- ##### Required request information:
  Authorization Token returned when you logged in must be provided in the header section of the request.
- #### Response of the request:
  All accounts infomation under the currently loggedin user will be returned on success.

##

#### Deposit to an account

- ##### Endpoint: host/api/clients/me/accounts/{{accountID}}/deposit
- ##### Request Type: PATCH
- ##### Request Body Example:

```
  {
    "balance": 1000.0,
    "description": "This is a test deposit"
  }
```

- ##### Required request information:
  Authorization Token returned when you logged in must be provided in the header section of the request.
  balance field.
- #### Response of the request:
  The account infomation will be returned on success.
  The transaction information will also be returned on success

##

#### Withdraw from an account

- ##### Endpoint: host/api/clients/me/accounts/{{accountID}}/withdraw
- ##### Request Type: PATCH
- ##### Request Body Example:

```
  {
    "balance": 200.0, 
    "description": "This is a test deposit"
  }
```

- ##### Required request information:
  Authorization Token returned when you logged in must be provided in the header section of the request.<br>
  balance field.
- #### Response of the request:
  The account infomation will be returned on success.
  The transaction information will also be returned on success

##

#### Delete an account

- ##### Endpoint: host/api/clients/me/accounts/{{accountID}}
- ##### Request Type: DELETE
- ##### Required request information:
  Authorization Token returned when you logged in must be provided in the header section of the request.<br>
- #### Response of the request:
  Status 200 on success.

##

#### Transfer to an account

- ##### Endpoint: host/api/clients/me/accounts/{{accountID}}/transfer
- ##### Request Type: POST
- ##### Request Body Example:

```
  {
    "accountNumber":739230763 ,
    "balance": 200
  }
```

PS: `accountID` is the account to transfer money from. <br>
`accountNumber` is the account to transfer money to.

- ##### Required request information:
  Authorization Token returned when you logged in must be provided in the header section of the request.<br>
  `accountNumber` and `accountID` must be provided.
- #### Response of the request:
  Both the sender and receiver account information will be provided on success. 
  Both transactions: Transfer of money out of one account and Transfer of money into an another account will be provided   
    
### Set up Automated Bill Payments 
   
- ##### Endpoint: host/api/clients/me/accounts/{{accountID}}/automatepayment
- ##### Request Type: PATCH
- ##### Request Body Example: 
    
```
  {
    "accountNumber": 837689434,
    "amount": 800, 
    "frequency": "weekly",
    "minutes": 14,
    "hour": 16,
    "day_of_the_week": 0,
    "day_of_the_month": 30
  }  
    
```
    
PS: `accountID` is the account to deposit money to. <br>
`accountNumber` is the account to withdraw money from. It's the opposite setup of Transfer API above. 
    
- ##### Required request information:
  Authorization Token returned when you logged in must be provided in the header section of the request.<br>
  `accountNumber` and `accountID` must be provided. 
   - `accountNumber`: the account to withdraw money from. A 404 status code will be sent if there are insufficient funds <br> 
   - `amount`: amount of money to be set up as scheduled payments 
   - `frequency`: must be one of the following to correctly set up scheduled payments: ['daily', 'weekly', 'monthly'] 
   - `minutes`: must be a number between 0 and 59 inclusive 
   - `hour`: must be a number between 0 and 23 inclusive 
   - `day_of_the_week`: represents Sunday to Saturday. Must be a number between 0 and 6 inclusive 
   - `day_of_the_month`: must be a number between 0 and 31 inclusive  
  
- #### IMPORTANT 
   - Account now has a new boolean field: `automatePayment`. This field is default set to false upon account creation. 
     It is set to true when this API is called. It will be automatically set to false when there are insufficient funds to make the   
     scheduled payment. <br> 
   - Two transactions will be added to the transaction history every time there is a scheduled payment. 
     Transaction 1: a deposit, and Transaction 2: a withdrawal. Use the transaction history APIs to retrieve this information. <br> 
   - This API allows scheduled payments between any two accounts. The frontend must ensure that this API is called for credit accounts 
    only. 
   - If you would like to read more on how the body of the request helps schedule payments, see this link: https://crontab.cronhub.io/ 
    
- #### Response of the request:
   - The information of both the current account (account to be deposited money to) and the account from which money will be withdrawn from
    will be provided on success.  

 ### Stop Automated Bill Payments 
   
- ##### Endpoint: host/api/clients/me/accounts/{{accountID}}/stopautomatedpayment
- ##### Request Type: PATCH
- ##### Request Body Example: no body needed  

 ```
  {
    
  }
``` 
    
- ##### Required request information:
  Authorization Token returned when you logged in must be provided in the header section of the request.<br>
  `accountID` must be provided.
- #### Response of the request:
  The account information will be returned. Scheduled automated payments for this account will be stopped. Note that the boolean field 
  `automatePayment` will be set to false.    

## Password Reset

#### Forgot Password

- ##### Endpoint: host/reset-password
- ##### Request Type: POST
- ##### Request Body Example:

```
  {
    "email":"ahmed.abdelsalam.sa@gmail.com"
  }
```

- ##### Required request information:
  `email` must be provided.
- #### Response of the request:
  An email will be sent to your email with a token to reset the password. <br>

#### Enter the new password

- ##### Endpoint: host/{{userid}}/{{resetToken}}
- ##### Request Type: POST
- ##### Request Body Example:

```
  {
    "password":"123456789"
  }
```

- ##### Required request information:
  `password` must be provided.
- #### Response of the request:
  Status 200 will be provided on success.

## Transaction Endpoints 

### Get Account Transactions 
- ##### Endpoint: host/api/clients/me/transactions/{{accountID}}
- ##### Request Type: GET
- ##### Request Body Example: no body needed 

```
  {}
```

- ##### Required request information:
  Authorization Token returned when the user is logged in must be provided in the header section of the request.
- #### Response of the request:
  All transactions under the current account will be returned. Please note the account refers to a bank account, not user account. A user can have several bank accounts. 
  
### Get All Transactions 
- ##### Endpoint: host/api/clients/me/transactions/
- ##### Request Type: GET
- ##### Request Body Example: no body needed 

```
  {}
```

- ##### Required request information:
  Authorization Token returned when the user is logged in must be provided in the header section of the request.
- #### Response of the request:
  All transactions under the current logged in user will be returned.

## ADMIN Endpoints  
### Generate Report 
- ##### Endpoint: host/api/clients/me/reports/
- ##### Request Type: GET
- ##### Request Body Example: no body needed  
    
```
  {}
```
- ##### Required request information:
  Authorization Token returned when the user is logged in must be provided in the header section of the request. Please note that the user must have the "manager" field marked as true to run the API successfully. 
- #### Response of the request:
  An object body consisting of the following fields will be returned: number of users, number of accounts, total balance in the bank, average balance in the bank, total number of transactions, number of deposits, number of withdraws, number of transfers 
  
    
#### Example Responses: A) User is a manager B) User is a regular bank customer 
```
  {
    "number_of_users": 3,
    "number_of_accounts": 2,
    "total_balance": 1000,
    "average_balance": 500,
    "total_number_of_transactions": 2,
    "num_deposit": 2,
    "num_withdraw": 0,
    "num_transfer": 0
  } 
```  
```
  {
    "error": "User is not authorized to view reports"
  } 
``` 


    
