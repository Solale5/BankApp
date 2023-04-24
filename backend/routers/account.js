const express = require('express')
const { Account, Transactions } = require('../models')
const auth = require('../middleware/auth')
const router = new express.Router()
require("dotenv").config();
const generateUniqueId = require('generate-unique-id');

const BANKAPP_ROUTING_NUMBER = "591983049"

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
    account.balance = account.balance - req.body.balance


    const account2 = await Account.findOne({ where: { accountNumber: req.body.accountNumber } })
    if (!account2) {
      return res.status(404).send()
    }
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


// TODO: 
// How to generate the  routing number? 

//[ each month pay off credit card]
// add joi validation 
// document the apis 
module.exports = router