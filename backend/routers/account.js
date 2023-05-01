const express = require('express')
const { Account, Transactions } = require('../models')
const auth = require('../middleware/auth')
const cron = require("node-cron");
const router = new express.Router()
require("dotenv").config();
const generateUniqueId = require('generate-unique-id');

const BANKAPP_ROUTING_NUMBER = "591983049"
let job

// add a new account 
router.post('/api/clients/me/accounts/', auth, async (req, res) => {
  try {
    let accountNumber = generateUniqueId({
      length: 9,
      useLetters: false
    })
    const account = await Account.create({ userid: req.user.id, type: req.body.type, accountNumber, routingNumber: BANKAPP_ROUTING_NUMBER, id: accountNumber })

    return res.status(201).send({ account })
  } catch (err) {
    return res.status(400).json(err)
  }
})


// get the information of a specific account
router.get('/api/clients/me/accounts/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const account = await Account.findOne({ where: { accountNumber: _id, userid: req.user.id } })

    return res.status(200).send({ account })
  } catch (err) {
    return res.status(400).json(err)
  }
})


// Load all information of all accounts of a user
router.get('/api/clients/me/accounts/', auth, async (req, res) => {
  try {
    const accounts = await Account.findAll({ where: { userid: req.user.id } })
    return res.status(200).send({ accounts })
  } catch (err) {
    return res.status(400).json(err)
  }
})


// update the information of a specific account
// deposit 
router.patch('/api/clients/me/accounts/:id/deposit', auth, async (req, res) => {
  const _id = req.params.id

  try {
    //find the account and update the balance 
    const account = await Account.findOne({ where: { accountNumber: _id, userid: req.user.id } })
    if (!account) {
      return res.status(404).send()
    }
    account.balance = account.balance + req.body.balance
    await account.save()

    //create a transaction entry for deposit 
    const transaction = await Transactions.create({ userid: req.user.id, accountid: _id })
    transaction.routingINTEGER = BANKAPP_ROUTING_NUMBER
    transaction.transactionAmt = req.body.balance
    transaction.transactionType = 'Deposit'
    transaction.description = req.body.description
    transaction.checkINTEGER = req.body.check_number
    await transaction.save()

    res.send({ account, transaction })
  } catch (e) {
    res.status(400).send(e)
  }
})

// withdraw 
router.patch('/api/clients/me/accounts/:id/withdraw', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const account = await Account.findOne({ where: { accountNumber: _id, userid: req.user.id } })
    if (!account) {
      return res.status(404).send()
    }
    if (account.balance < req.body.balance) {
      return res.status(404).send('Not enough money')
    }
    account.balance = account.balance - req.body.balance
    await account.save()

    //create a transaction entry for withdraw 
    const transaction = await Transactions.create({ userid: req.user.id, accountid: _id })
    transaction.routingINTEGER = BANKAPP_ROUTING_NUMBER
    transaction.transactionAmt = req.body.balance
    transaction.transactionType = 'Withdraw'
    transaction.description = req.body.description
    transaction.checkINTEGER = req.body.check_number
    await transaction.save()

    res.send({ account, transaction })
  } catch (e) {
    res.status(400).send(e)
  }
})

// transfer to another account 
// internal transfer between accounts of the same user 
router.post('/api/clients/me/accounts/:id/transfer', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const account = await Account.findOne({ where: { accountNumber: _id, userid: req.user.id } })

    if (!account) {
      return res.status(404).send()
    }

    if (account.balance < req.body.balance) {
      return res.status(404).send('Not enough money')
    }

    const account2 = await Account.findOne({ where: { accountNumber: req.body.accountNumber } })
    if (!account2) {
      return res.status(404).send()
    }

    if (account2.accountNumber == _id) {
      return res.status(404).send('You can\'t transfer to this account')
    }
    account.balance = account.balance - req.body.balance
    account2.balance = account2.balance + req.body.balance

    await account2.save()
    await account.save()


    //create transaction entries for the transfer 
    const transaction1 = await Transactions.create({ userid: req.user.id, accountid: account.id })
    transaction1.routingINTEGER = BANKAPP_ROUTING_NUMBER
    transaction1.transactionAmt = req.body.balance
    transaction1.transactionType = 'Transfer'
    transaction1.description = "Transferred out of account"
    await transaction1.save()

    const transaction2 = await Transactions.create({ userid: account2.userid, accountid: account2.id })
    transaction2.routingINTEGER = BANKAPP_ROUTING_NUMBER
    transaction2.transactionAmt = req.body.balance
    transaction2.transactionType = 'Transfer'
    transaction2.description = "Transferred into account"
    await transaction2.save()

    res.send({ account, account2, transaction1, transaction2 })
  } catch (e) {
    res.status(400).send(e)
  }
})

//set up automated bill payments 
router.patch('/api/clients/me/accounts/:id/automatepayment', auth, async (req, res) => {
  const _id = req.params.id

  console.log("Recieved a request for a scheduled payment.")
  console.log("Account Number: " + req.body.accountNumber + " Frequency: " + req.body.frequency + " Minutes: " + req.body.minutes + " Hour: " + req.body.hour + " Day of the week: " + req.body.day_of_the_week + " Day of the month: " + req.body.day_of_the_month)

  try {
    //find account1 to set up automatic bill payments for 
    const account1 = await Account.findOne({ where: { accountNumber: _id, userid: req.user.id } })
    if (!account1) {
      return res.status(404).send()
    }

    //find account2 to withdraw money from 
    const account2 = await Account.findOne({ where: { accountNumber: req.body.accountNumber } })
    if (!account2) {
      return res.status(404).send("Account to be withdrawn money from cannot be found.")
    }


    //check if account2 has sufficient funds before scheduling cron 
    if (account2.balance < req.body.balance) {
      account1.automatePayment = false //turn off automated payments if there is insufficient money 
      await account1.save()
      return res.status(404).send('Not enough money')
    }

    console.log("Account2 has sufficient funds to be withdrawn money from.")

    //retrieve the frequency and construct the cron expression 
    let frequency = req.body.frequency.toLowerCase()
    console.log(frequency)
    let cronExpression = ""
    if (frequency === "daily") {
      cronExpression = req.body.minutes + " " + req.body.hour + " * * *"
    }
    else if (frequency == "weekly") {
      cronExpression = req.body.minutes + " " + req.body.hour + " * * " + req.body.day_of_the_week
    }
    else if (frequency == "monthly") {
      cronExpression = req.body.minutes + " " + req.body.hour + " " + req.body.day_of_the_month + " * * "
    }
    else {
      return res.status(400).send("Frequency must be of the following: daily, weekly, monthly ")
    }

    console.log("Cron expression for scheduling payment: " + cronExpression)

    //set the automate payment flag to start scheduled payment 
    account1.automatePayment = true
    account1.save()

    //schedule a job to increment the account balance  
    job = cron.schedule(cronExpression, async () => {

      if (account1.automatePayment) {

        //check if account2 has sufficient funds after having started scheduled payments 
        if (account2.balance < req.body.balance) {
          account1.automatePayment = false //turn off automated payments if there is insufficient money 
          account1.save()
          return res.status(404).send('Not enough money')
        }

        //withdraw from account2, deposit into account1 
        account2.balance = account2.balance - req.body.balance
        account1.balance = account1.balance + req.body.balance

        account2.save()
        account1.save()

        console.log("The scheduled payment was successfully made.")

        //update the transaction history for both accounts 
        const transaction1 = await Transactions.create({ userid: req.user.id, accountid: account1.id })
        transaction1.routingINTEGER = BANKAPP_ROUTING_NUMBER
        transaction1.transactionAmt = req.body.balance
        transaction1.transactionType = 'Automated Payment'
        transaction1.description = "Deposited into Account"
        transaction1.save()

        const transaction2 = await Transactions.create({ userid: account2.userid, accountid: account2.id })
        transaction2.routingINTEGER = BANKAPP_ROUTING_NUMBER
        transaction2.transactionAmt = req.body.balance
        transaction2.transactionType = 'Automated Payment'
        transaction2.description = "Withdrawn from account"
        transaction2.save()

        console.log("The transaction histories were correctly created.")
        console.log("Ending the scheduled payment now.")
      }
    });

    res.send({ account1, account2 })
  } catch (e) {
    res.status(400).send(e)
  }
})


//stop automated bill payments
router.patch('/api/clients/me/accounts/:id/stopautomatedpayment', auth, async (req, res) => {
  const _id = req.params.id

  try {
    //find the account and set automatePayment to false 
    const account = await Account.findOne({ where: { accountNumber: _id, userid: req.user.id } })
    if (!account) {
      return res.status(404).send()
    }

    //if scheduled job, stop automated bill payments
    if (job) {
      job.stop();
    }

    account.automatePayment = false
    await account.save()

    res.send({ account })
  } catch (e) {
    res.status(400).send(e)
  }
})


// delete a specific account
router.delete('/api/clients/me/accounts/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const account = await Account.destroy({ where: { accountNumber: _id, userid: req.user.id } })
    res.send({ account })
  } catch (e) {
    res.status(400).send(e)
  }

})


module.exports = router