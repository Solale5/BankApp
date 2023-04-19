const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require("dotenv").config();


const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.USER,
		pass: process.env.PASS
	}
});



const verifyEmail = async (email) => {
		const token = jwt.sign({
			data: email, 
		}, 'ourSecretKey', { expiresIn: '2m' }
	);	

	const mailConfigurations = {

		// It should be a string of sender/server email
		to: email,
	
		// Subject of Email
		subject:'Confirm your email address	',
		
		// This would be the text of email body
		text: `
		You recently signed up to Sparans Bank using this email.
		Please follow the following link to verify your email:
		http://localhost:3000/users/verify/${token}
		Thanks for banking with us!
		`
	};
	
	transporter.sendMail(mailConfigurations, function(error, info){
		if (error) throw Error(error);
		console.log('Email Sent Successfully');
		console.log(info);
	});
	
}
module.exports = verifyEmail