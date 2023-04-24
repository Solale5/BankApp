const express = require('express')
const { Transactions } = require('../models')
const auth = require('../middleware/auth')
const router = new express.Router()
require("dotenv").config();

// Load the transaction history for a specific account
router.get('/api/clients/me/transactions/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const transactions = await Transactions.findAll({ where: { accountid: _id } })
        return res.status(200).send({ transactions })
    } catch (err) {
        return res.status(400).json(err)
    }
})

// Load the entire transaction history for a user
router.get('/api/clients/me/transactions/', auth, async (req, res) => {
    try {
        const transactions = await Transactions.findAll({ where: { userid: req.user.id } })
        return res.status(200).send({ transactions })
    } catch (err) {
        return res.status(400).json(err)
    }
})

module.exports = router;