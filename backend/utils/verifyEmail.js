const jwt = require('jsonwebtoken');
const sendEmail = require('./sendemail');
const {Token} = require('../models');
require("dotenv").config();

const verifyEmail = async (user, token) => {


	// frontend url should be added here
	const text=  `
	You recently signed up to Sparans Bank using this email.
	Please follow the following link to verify your email:
	http://${process.env.BASE_URL}/api/clients/verify/${token}
	Thanks for banking with us!
	`
	// send email function
	await sendEmail(user.email, 'Confirm your email address	', text)
	await Token.create({ userid: user.id, value: token});

}
module.exports = verifyEmail