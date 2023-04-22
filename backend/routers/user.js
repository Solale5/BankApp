const express = require('express')
const {User, Token} = require('../models')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const verifyEmail = require('./tokensender')

const router = new express.Router()
router.post('/api/clients/signup', async (req, res) => {
    try {
      const user = await User.create(req.body)

      //verify email  (uncomment later)
      //await verifyEmail(req.body.email)

      return res.status(201).send({user})
    } catch (err) {
      return res.status(400).json(err)
    }
  })


  // adding auth only for testing purposes
router.post('/api/clients/login',async (req, res) => {
  try {
    // find the user by email
    // check the password and the email verification
      const user = await User.findOne({ where: { email: req.body.email } })
      if (!user ) {
        throw new Error()
      }

      // check the password 
      // const passwordCheck =  bcrypt.compare(req.body.password, user.password)

      // generate and save the token
      const token = jwt.sign({ _id: user.id}, 'thisismynewcourse')
      await Token.create({ userid: user.id, value: token});
    
      res.send({ user, token })
     
  } catch (e) {
    return res.status(400).send({ error: 'Invalid login credentials' })
  }
})



// logout 
// you should provide the token in the request header
router.post('/api/clients/logout', auth, async (req, res) => {
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
  // should contain all the changes 
  // update the address , email , password in a special way 
  const allowedUpdates = [ 'email', 'password', 'name', 'age',  'securityQuestion', 'phoneNumber', 'securityAnswer']
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


// verify the email 
router.get('/users/verify/:token',  (req, res)=>{
	const token = req.params.token;

	// Verifying the JWT token
	jwt.verify(token, 'ourSecretKey',  async (err, decoded) => {
		if (err) {
     
			res.send("Email verification failed, possibly the link is invalid or expired");
		}
		else {
      const user = await User.findOne({ where: { email: decoded.data } })
      await user.update({active: true})
			res.send("Email verifified successfully");
		}
	});
});



module.exports = router