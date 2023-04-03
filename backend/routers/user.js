const express = require('express')
const User = require('../models/user')
//const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/users/signup', async (req, res) => {

    
    try {
        
      //const user = await User.create()
     
      return res.send("signed up")

    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

module.exports = router