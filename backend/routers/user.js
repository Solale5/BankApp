const express = require('express')
const {User} = require('../models')
//const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/users/signup', async (req, res) => {

  const { fname } = req.body

    try {
        
      const user = await User.create({ fname })
      
      return res.send("signed up")

    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

module.exports = router