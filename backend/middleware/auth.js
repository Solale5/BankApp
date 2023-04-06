const jwt = require('jsonwebtoken')
const {User,Token} = require('../models/')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const token_record = await Token.findOne({where:{ userid: decoded._id, value: token} })

        if (!token_record) {
           throw new Error()
        }
        const user = await User.findOne({ where: { id: decoded._id } })

        req.token = token
        req.user = user

        console.log(req)
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth