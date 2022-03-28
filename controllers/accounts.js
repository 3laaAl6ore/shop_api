const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("./isAuth");
// Models
const User = require("../models/account");
const Store = require("../models/store");
// create a new account
router.post("/createAccount", async (request, response) => {
  console.log(request);
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
        const passcode = GenerateRandomPasscode(10000, 99999);
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
            message: accountCreated,
            passcode: passcode,
          });
        });
        console.log(response);
      }
    })
    .catch((err) => {
      return response.status(500).json({
        message: err.message,
      });
    });
});
// login
router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  User.findOne({ email: email })
    .then(async (user) => {
      if (user) {
        if (user.isApproved && !user.isLocked) {
          const isMatch = await bcryptjs.compare(password, user.password);
          if (isMatch) {
            //create token
            const acc_data = {
              firstName: user.firstName,
              lastName: user.lastName,
              avatarUrl: user.avatarUrl,
              mobile: user.mobile,
              email: user.email,
              _id: user._id,
            };

            const token = await jwt.sign(
              acc_data,
              "A6cXZ9Mj5hM4As2wiIugIz5DHNO3q1VF"
            );
            // response
            return response.status(200).json({
              msg: token,
            });
          } else {
            return response.status(200).json({
              msg: "your password is not match",
            });
          }
        } else {
          return response.status(200).json({
            msg: "your account is not approved",
          });
        }
      } else {
        return response.status(200).json({
          msg: "email not exist",
        });
      }
    })
    .catch((err) => {
      return response.status(200).json({
        msg: "user not found",
      });
    });
});
// verify
router.post("/verify", async (request, response) => {
  // get passcode and email
  const { email, passcode } = request.body;
  // is user exists
  User.findOne({ email: email })
    .then(async (user) => {
      // verify code
      if (user) {
        if (user.passcode == passcode) {
          // update isApproved
          user.isApproved = true;
          user.save().then((accountUpdate) => {
            return response.status(200).json({
              msg: accountUpdate,
            });
          });
        } else {
          return response.status(200).json({
            msg: "passcode not match",
          });
        }
      } else {
        // response
        return response.status(200).json({
          msg: "user not found",
        });
      }
    })
    .catch((err) => {
      return response.status(500).json({
        msg: err,
      });
    });
});
// forget password =>post email
router.post("/forgetPassword", async (request, response) => {
  const { email } = request.body;
  User.findOne({ email: email })
    .then(async (user) => {
      if (user) {
        const passcode = GenerateRandomPasscode(10000, 99999);
        user.passcode = passcode;
        user
          .save()
          .then((newPasscode) => {
            return response.status(200).json({
              message: "you get new passcode please enter it..",
              passcode: newPasscode,
            });
          })
          .catch((err) => {
            return response.status(200).json({
              message: err,
            });
          });
      } else {
        return response.status(200).json({
          message: "user not found",
        });
      }
    })
    .catch((err) => {
      return response.status(200).json({
        message: err.message,
      });
    });
});
// verifyRecover
router.post("/verifyRecover", async (request, response) => {
  const { email, passcode } = request.body;
  User.findOne({ email: email })
    .then(async (user) => {
      if (user) {
        const isMatch = user.passcode == passcode;
        if (isMatch) {
          user.passcode = passcode;
          user
            .save()
            .then((newPasscode) => {
              return response.status(200).json({
                message: "your account has been verified",
              });
            })
            .catch((err) => {
              return response.status(200).json({
                message: err.message,
              });
            });
        } else {
          return response.status(200).json({
            message: "pascode not match",
          });
        }
      } else {
        return response.status(200).json({
          message: "email not exist",
        });
      }
    })
    .catch((err) => {
      return response.status(200).json({
        message: err.message,
      });
    });
});
//update password
router.post("/updatePassword", async (request, response) => {
  const { email, password } = request.body;
  User.findOne({ email: email })
    .then(async (user) => {
      if (user) {
        if (user.isApproved) {
          const isSame = await bcryptjs.compare(password, user.password);
          if (isSame) {
            return response.status(200).json({
              message: "your password is the same of the old password...",
            });
          } else {
            const formatedPassword = await bcryptjs.hash(password, 10);
            user.password = formatedPassword;
            user
              .save()
              .then((newPassword) => {
                return response.status(200).json({
                  message: newPassword,
                  // new: password,
                });
              })
              .catch((err) => {
                return response.status(200).json({
                  message: err.message,
                });
              });
          }
        } else {
          return response.status(200).json({
            message: "your account is not verified...",
          });
        }
      } else {
        return response.status(200).json({
          message: "email not exist",
        });
      }
    })
    .catch((err) => {
      return response.status(200).json({
        message: err.message,
      });
    });
});
//Generate Random Passcode
const GenerateRandomPasscode = (min, max) => {
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
//get user data
router.get("/getUserData", isAuth, async (request, response) => {
  const id = request.account._id;
  const store = await Store.findOne({ associatedID: id }).populate(
    "associatedID"
  );

  return response.status(200).json({
    // message: `hello ${request.account.firstName}`,
    data: store,
  });
});

module.exports = router;
