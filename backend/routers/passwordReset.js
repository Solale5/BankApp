const {User, Token} = require('../models')
const sendEmail = require('../utils/sendemail');
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const Joi = require('joi');
require("dotenv").config();


// how reset password works ?
// 1. user enters email address
// 2. we check if the email address exists in the database
// 3. if it exists, we generate a token and save it in the database
// 4. we send an email to the user with a link containing the token
// 5. user clicks on the link and is redirected to the reset password page  (frontend)
// 6. user enters new password and submits the form
// 7. we check if the token is valid
// 8. if it is valid, we update the password in the database


router.post("/reset-password", async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const user = await User.findOne({ where: { email: req.body.email } })

        if (!user)
            return res.status(400).send( "user with given email doesn't exist" );
            
        let token = await Token.findOne({ where: { userid: user.id } })
      
        if (!token) {
            token = jwt.sign({ _id: user.id}, process.env.Private_Key)
            await Token.create({ userid: user.id, value: token});
        }

        // frontend url 
        const link = `https://${process.env.BASE_URL}/password-reset/${user.id}/${token.value}`;
        const text=  `
        Please, use the following link to reset your password: 
        ${link}
        Thanks for banking with us!
        `

        await sendEmail(user.email, "Password reset", text);
   
       //testing ( just provide the user id and the token)
       res.status(200).send({user, token})

    } catch (error) {
        res.status(400).send( "An error occured");
    }
});

router.post("/:id/:token", async (req, res) => {
    try {

        // validate the password 
        const schema = Joi.object({ password: Joi.string().min(6).required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ where: { id: req.params.id }});
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({ where: { userid: user.id } });

        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        // remove all the tokens associated with the user to force him login again
        await Token.destroy({ where: { userid: user.id } });

        res.send("password reset successfully");
    } catch (error) {
        res.status(400).send( "An error occured");
    }
});

module.exports = router;