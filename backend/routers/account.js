const express = require('express')
const {User, Account} = require('../models')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const router = new express.Router()

// add a new account 
// a user might have multiple accounts of the same type 
router.post('/api/clients/me/accounts/', auth, async (req, res) => {
    try {
      const account = await Account.create({userid: req.user.id, type: req.body.type})
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

// transfer to another account 
// internal trnasfer 
router.post('/api/clients/me/accounts/:id/transfer', auth, async (req, res) => {
    const _id = req.params.id
  
    try {
        const account = await Account.findOne({where: {uuid: _id, userid: req.user.id}})
        if (!account ) {
            return res.status(404).send()
        }
        account.balance = account.balance - req.body.balance
        await account.save()

        const user = await User.findOne({where: {email: req.body.email}}); 
        // TODO: send a request to the deposit endpoint of the other account
        const account2 = await Account.findOne({where: { userid: user.id}})
        account2.balance = account2.balance + req.body.balance
        await account2.save()


          res.send({ account, user, account2 })
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
// should I hide any information of the account? no 
// should I add a new account for each user? 5 accounts for each user 
// How to generate the account number and routing number? 
// How to make sure the account number is unique?
// which account to receive the money ? 
// How to transfer money to another account?
// how to transfer money to an external bank account ? 
// Is there a special format for a bank account number and the routing number?
// transfer to another account but not credit 
// internal transfer within the same user accounts 
//[ each month pay off  credit card]
// transfer to another account but not credit



module.exports = router