const express = require("express");
const { User, Token } = require("../models");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const verifyEmail = require("../utils/verifyEmail");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const router = new express.Router();
router.post("/api/clients/signup", async (req, res) => {
  console.log("register request recieved");
  try {
    //validate the data
    const schema = Joi.object({
      manager: Joi.boolean(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      name: Joi.string().required(),
      dob: Joi.date().required(),
      securityQuestion: Joi.string().required(),
      phoneNumber: Joi.string().length(10).required(),
      securityAnswer: Joi.string().required(),
      recoveryEmail: Joi.string().email().required(),
      zipcode: Joi.string().length(5).required(),
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      dob: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) return res.status(400).send(error.details[0].message);

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).send("Email already exists");
    }

    const user = await User.create(req.body);

    //verify email
    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.Private_Key,
      { expiresIn: "2m" }
    );

    //await verifyEmail(user, token)

    return res.status(201).send({ user, token });
  } catch (err) {
    console.log(err);
    return res.status(400).json("Invalid data");
  }
});

// adding auth only for testing purposes
router.post("/api/clients/login", async (req, res) => {
  try {
    //validate the data
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      securityAnswer: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) return res.status(400).send(error.details[0].message);

    // check the password and the email verification
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      throw new Error();
    }

    // check the password and the security answer
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.password
    );
    const securityAnswerCheck = await bcrypt.compare(
      req.body.securityAnswer,
      user.securityAnswer
    );

    if (!passwordCheck || !securityAnswerCheck) {
      throw new Error();
    }

    if (!user.active) {
      await Token.destroy({ where: { userid: user.id } });
      await verifyEmail(user);
      return res.status(400).send("Please verify your email to login");
    }

    // generate and save the token
    const token = jwt.sign({ _id: user.id }, process.env.Private_Key);
    await Token.create({ userid: user.id, value: token });

    res.status(200).send({ user, token });
  } catch (e) {
    return res.status(400).send("Invalid login credentials");
  }
});

// logout
router.post("/api/clients/logout", auth, async (req, res) => {
  try {
    await Token.destroy({
      where: {
        value: req.token,
        userid: req.user.id,
      },
    });
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

// logout from all devices
router.post("/api/clients/logoutAll", auth, async (req, res) => {
  try {
    await Token.destroy({
      where: {
        userid: req.user.id,
      },
    });
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

//get the user profile
router.get("/api/clients/me", auth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/api/clients/me", auth, async (req, res) => {
  //validate the data
  const schema = Joi.object({
    name: Joi.string(),
    dob: Joi.date(),
    //dob: Joi.string(),
    phoneNumber: Joi.string().length(10),
    securityAnswer: Joi.string(),
    recoveryEmail: Joi.string().email(),
    street: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send("Invalid data");

  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "recoveryEmail",
    "street",
    "city",
    "state",
    "name",
    "dob",
    "phoneNumber",
    "securityAnswer",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send("Invalid updates!");
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/api/clients/me", auth, async (req, res) => {
  try {
    await Token.destroy({
      where: {
        userid: req.user.id,
      },
    });

    await User.destroy({
      where: {
        id: req.user.id,
      },
    });
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

// verify the email
router.post("/api/clients/verify/:token", (req, res) => {
  const token = req.params.token;

  // Verifying the JWT token
  jwt.verify(token, process.env.Private_Key, async (err, decoded) => {
    if (err) {
      res
        .status(400)
        .send(
          "Email verification failed, possibly the link is invalid or expired"
        );
    } else {
      const user = await User.findOne({ where: { email: decoded.email } });
      await user.update({ active: true });
      res.status(200).send("Email verifified successfully");
    }
  });
});

module.exports = router;
