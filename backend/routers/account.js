const express = require('express')
const {User, Account} = require('../models')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const router = new express.Router()
require("dotenv").config();
const crypto = require('crypto');
const generateUniqueId = require('generate-unique-id');


// add a new account 
router.post('/api/clients/me/accounts/', auth, async (req, res) => {
    try {
      let accountNumber = generateUniqueId({
        length: 9,
        useLetters: false
      })
      const account = await Account.create({userid: req.user.id, type: req.body.type, accountNumber})

      return res.status(201).send({account})
    } catch (err) {
      return res.status(400).json(err)
    }
  })


// get the information of a specific account
  router.get('/api/clients/me/accounts/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
      const account = await Account.findOne({where: {accountNumber: _id, userid: req.user.id}})
      
      return res.status(200).send({account})
    } catch (err) {
      return res.status(400).json(err)
    }
  })


  // Load all information of all accounts of a user
  router.get('/api/clients/me/accounts/', auth, async (req, res) => {
    try {
      const accounts = await Account.findAll({where: {userid: req.user.id}})
      return res.status(200).send({accounts})
    } catch (err) {
      return res.status(400).json(err)
    }
  })


// update the information of a specific account
// deposit 
router.patch('/api/clients/me/accounts/:id/deposit', auth, async (req, res) => {
    const _id = req.params.id
  
    try {
        const account = await Account.findOne({where: {accountNumber: _id, userid: req.user.id}})
        if (!account ) {
            return res.status(404).send()
        }
        account.balance = account.balance + req.body.balance
        await account.save()

        res.send({ account })
    } catch (e) {
        res.status(400).send(e)
    }
  })

// withdraw 
router.patch('/api/clients/me/accounts/:id/withdraw', auth, async (req, res) => {
    const _id = req.params.id
  
    try {
        const account = await Account.findOne({where: {accountNumber: _id, userid: req.user.id}})
        if (!account ) {
            return res.status(404).send()
        }
        if (account.balance < req.body.balance) {
          return res.status(404).send('Not enough money')
        }
        account.balance = account.balance - req.body.balance
        await account.save()
        res.send({ account })
    } catch (e) {
        res.status(400).send(e)
    }
  })

// transfer to another account 
// internal trnasfer 
router.post('/api/clients/me/accounts/:id/transfer', auth, async (req, res) => {
    const _id = req.params.id
  
    try {
        const account = await Account.findOne({where: {accountNumber: _id, userid: req.user.id}})

        if (!account  ) {
            return res.status(404).send()
        }

        if (account.balance < req.body.balance) {
          return res.status(404).send('Not enough money')
        }
        account.balance = account.balance - req.body.balance
      
        const account2 = await Account.findOne({where: { accountNumber: req.body.accountNumber, userid: req.user.id}})
        if (!account2 ) {
          return res.status(404).send()
        }
        account2.balance = account2.balance + req.body.balance

        await account2.save()
        await account.save()

         res.send({ account, account2 })
    } catch (e) {
        res.status(400).send(e)
    }
  })


// delete a specific account
router.delete('/api/clients/me/accounts/:id', auth, async (req, res) => {
    const _id = req.params.id
  
    try {
       const account = await Account.destroy({where: {accountNumber: _id, userid: req.user.id}})
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