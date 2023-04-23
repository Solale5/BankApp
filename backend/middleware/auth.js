const jwt = require('jsonwebtoken')
const {User,Token} = require('../models/')
require("dotenv").config();


const auth = async (req, res, next) => {

    try {
        const token = req.header('authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.Private_Key)
        const token_record = await Token.findOne({where:{ userid: decoded._id, value: token} })

        if (!token_record) {
           throw new Error()
        }
        const user = await User.findOne({ where: { id: decoded._id } })

        req.token = token
        req.user = user
        
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth