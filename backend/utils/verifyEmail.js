const jwt = require('jsonwebtoken');
const sendEmail = require('./sendemail');
require("dotenv").config();

const verifyEmail = async (email) => {
		const token = jwt.sign({
			data: email, 
		}, 'ourSecretKey', { expiresIn: '2m' }
	);	

	const mailConfigurations = {

		// It should be a string of sender/server email
		to: email,
		from: process.env.USER,
		// Subject of Email
		subject:'Confirm your email address	',
		
		// This would be the text of email body
		text: `
		You recently signed up to Sparans Bank using this email.
		Please follow the following link to verify your email:
		http://${process.env.HOST}/users/verify/${token}
		Thanks for banking with us!
		`
	};
	
	// send email function
	await sendEmail(mailConfigurations)
}


module.exports = verifyEmail