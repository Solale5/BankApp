const express = require('express')
const { User, Account, Transactions } = require('../models')
const auth = require('../middleware/auth')
const router = new express.Router()
require("dotenv").config();

// generate reports for the bank manager: number of users, 
router.get('/api/clients/me/reports/', auth, async (req, res) => {
    try {
        if (req.user.manager == true) {
            //retrieve users, accounts, transanctions from DB 
            const users = await User.findAll({})
            const accounts = await Account.findAll({})
            const transactions = await Transactions.findAll({})

            //calculate total and average balance 
            let total_balance = average_balance = 0.0
            if (accounts.length > 0) {
                accounts.forEach(account => total_balance += account.balance)
                average_balance = total_balance / accounts.length
            }

            //calculate transaction breakdown into number of deposits, withdraws, and transfers 
            let num_deposit = num_withdraw = num_transfer = 0
            transactions.forEach(transaction => {
                if (transaction.transactionType === "Deposit") {
                    num_deposit += 1;
                }
                else if (transaction.transactionType === "Withdraw") {
                    num_withdraw += 1;
                }
                else {
                    num_transfer += 1;
                }
            })

            return res.status(200).send({
                number_of_users: users.length,
                number_of_accounts: accounts.length,
                total_balance,
                average_balance,
                total_number_of_transactions: transactions.length,
                num_deposit,
                num_withdraw,
                num_transfer
            })
        }
        else {
            return res.status(401).send({ error: "User is not authorized to view reports" })
        }

    } catch (err) {
        return res.status(400).json(err)
    }
})

module.exports = router;