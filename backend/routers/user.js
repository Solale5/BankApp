const express = require('express')
const {User, Token} = require('../models')
const auth = require('../middleware/auth')

//const auth = require('../middleware/auth')

const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const router = new express.Router()
router.post('/api/clients/signup', async (req, res) => {
    try {
      const user = await User.create(req.body)
      return res.status(201).send({user})
    } catch (err) {
      console.log(err)
      return res.status(400).json(err)
    }
  })


  // adding auth only for testing purposes
router.post('/api/clients/login',async (req, res) => {
  try {
    // find the user by email
      const user = await User.findOne({ where: { email: req.body.email, password:req.body.password } })
  
      // generate and save the token
      const token = jwt.sign({ _id: user.id}, 'thisismynewcourse')
      await Token.create({ userid: user.id, value: token});

      //test
      //const tokens = await Token.findAll();
    
      res.send({ user, token })
     
  } catch (e) {
    res.status(400).send(e)
  }
})



// logout 
// you should provide the token in the request header
router.post('/api/clients/logout', auth, async (req, res) => {
 console.log('logout', req.token)
try{
      await Token.destroy({
        where: {
          value: req.token,
          userid: req.user.id
          }
        });     
      res.status(200).send()
    } catch (e) {
      res.status(500).send()
  }
})

// logout from all devices 
router.post('/api/clients/logoutAll', auth, async (req, res) => {
  try {
    await Token.destroy({
      where: {
        userid: req.user.id
        }
      });  
      res.send()
  } catch (e) {
      res.status(500).send()
  }
})

//get the user profile
router.get('/api/clients/me', auth, async (req, res) => {
  
  res.send(req.user)
})

router.patch('/api/clients/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = [ 'email', 'password']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
      updates.forEach((update) => req.user[update] = req.body[update])
      await req.user.save()
      res.send(req.user)
  } catch (e) {
      res.status(400).send(e)
  }
})


router.delete('/api/clients/me', auth, async (req, res) => {
  try {
    await Token.destroy({
      where: {
        userid: req.user.id}

      });  

      await User.destroy({
        where: {
          id: req.user.id
        }
      })


      res.send()
  } catch (e) {
      res.status(500).send()
  }
})

module.exports = router