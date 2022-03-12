const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcryptjs = require("bcryptjs");
// Models
const User = require("../models/account");

router.post("/createAccount", async (request, response) => {
  //console.log(request);
  // get user input
  const { firstName, lastName, email, password, mobile } = request.body;
  // check if user already exists

  User.findOne({ email: email })
    .then(async (account) => {
      if (account) {
        return response.status(500).json({
          message: "user alredy exist try again with another email..",
        });
      } else {
        // if not,
        // crypt password
        const formatedPassword = await bcryptjs.hash(password, 10);
        // generate passcode
        const passcode = GenerateRandomPassword(10000, 99999);
        // create user in mongodb

        const _user = new User({
          _id: mongoose.Types.ObjectId(),
          email: email,
          password: formatedPassword,
          mobile: mobile,
          firstName: firstName,
          lastName: lastName,
          passcode: passcode,
        });
        _user.save().then((accountCreated) => {
          // response
          return response.status(200).json({
            message:accountCreated,
            passcode: passcode
          })
        })
        console.log(response);
      }
    })
    .catch((err) => {
      return response.status(500).json({
        message: err.message,
      });
    });
    
});

const GenerateRandomPassword = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

router.get("/sayHello", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: users,
    });
  } catch (error) {
    return res.status(200).json({
      message: error.message,
    });
  }
});

module.exports = router;
