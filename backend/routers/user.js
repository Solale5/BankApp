const express = require('express')
const {User, Token} = require('../models')
//const auth = require('../middleware/auth')

const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const router = new express.Router()
router.post('/users/signup', async (req, res) => {

  const { email, password } = req.body

    try {
        
      const user = await User.create({ email, password })
  
      return res.send({user})

    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })


router.post('/users/login', async (req, res) => {
  try {
    // find the user by email
      const user = await User.findOne({ where: { email: req.body.email, password:req.body.password } })
      
      // generate and save the token
      const token = jwt.sign({ _id: user.id}, 'thisismynewcourse')
      await Token.create({ userid: user.id, value: token});

      //test
      const tokens = await Token.findAll();
      res.send({ user, tokens })
     
  } catch (e) {
      res.status(400).send()
  }
})


module.exports = router