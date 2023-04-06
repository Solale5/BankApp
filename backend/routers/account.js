const express = require('express')
const {User, Account} = require('../models')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')


const router = new express.Router()


// add a new account 
// make sure it is only one account of each type 
router.post('/api/clients/me/accounts/', auth, async (req, res) => {
    try {
      const account = await Account.create({userid: req.user.id})
      return res.status(201).send({account})
    } catch (err) {
      return res.status(400).json(err)
    }
  })


// get the information of a specific account
  router.get('/api/clients/me/accounts/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
      const account = await Account.findOne({where: {uuid: _id, userid: req.user.id}})
      return res.status(200).send({account})
    } catch (err) {
      return res.status(400).json(err)
    }
  })


  // Load all information of all accounts of a user
  router.get('/api/clients/me/accounts/', auth, async (req, res) => {
    try {
      const accounts = await Account.findOne({where: {userid: req.user.id}})
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
        const account = await Account.findOne({where: {uuid: _id, userid: req.user.id}})
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
        const account = await Account.findOne({where: {uuid: _id, userid: req.user.id}})
        if (!account ) {
            return res.status(404).send()
        }
        account.balance = account.balance - req.body.balance
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
       const account = await Account.destroy({where: {uuid: _id, userid: req.user.id}})
        res.send({ account })
    } catch (e) {
        res.status(400).send(e)
    }

})


// TODO: 
// should I hid any information of the account?
// should I add a new account for each user?
// How to generate the account number and routing number?
// How to make sure the account number and routing number are unique?

module.exports = router