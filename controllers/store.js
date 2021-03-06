const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const isAuth = require("./isAuth");
const User = require("../models/account");
const Store = require("../models/store");

// put .. update store
router.put("/updateStore", isAuth, async (request, response) => {
  const associatedID = request.account._id;
  const store = await Store.findOne({ associatedID: associatedID });

  const {
    storeName,
    email,
    mobile,
    phone,
    city,
    address,
    latitude,
    longtitude,
    storeDescription,
    logo,
    isTakeAway,
    isDelivery,
    workingHours,
  } = request.body;

  store.storeName = storeName;
  store.storeDescription = storeDescription;
  store.logo = logo;
  store.isTakeAway = isTakeAway;
  store.isDelivery = isDelivery;
  store.workingHours = workingHours;
  store.contactInfo = {
    email: email,
    mobile: mobile,
    phone: phone,
    city: city,
    address: address,
    latitude: latitude,
    longtitude: longtitude,
  };

  store
    .save()
    .then((storeUpdated) => {
      return response.status(200).json({
        message: storeUpdated,
      });
    })
    .catch((err) => {
      return response.status(200).json({
        message: err,
      });
    });
});
// create store
router.post("/createStore", isAuth, async (request, response) => {
  const associatedID = request.account._id;
  const isStoreExist = await Store.findOne({ associatedID: associatedID });
  if (isStoreExist) {
    return response.status(200).json({
      message: "you can only add one store ",
    });
  } else {
    const storeId = mongoose.Types.ObjectId();
    const {
      storeName,
      isTakeAway,
      isDelivery,
      email,
      mobile,
      storeDescription,
      phone,
      city,
      address,
      latitude,
      longtitude,
    } = request.body;
    const account = await User.findById(associatedID);
    account.isBusiness = true;
    return account
      .save()
      .then((accountUP) => {
        const _store = new Store({
          _id: storeId,
          associatedID: associatedID,
          storeName: storeName,
          storeDescription: storeDescription,
          isTakeAway: isTakeAway,
          isDelivery: isDelivery,
          subs: [],
          contactInfo: {
            email: email,
            mobile: mobile,
            phone: phone,
            city: city,
            address: address,
            latitude: latitude,
            longtitude: longtitude,
          },
          reviews: [],
          workingHours: [],
        });
        return _store
          .save()
          .then((new_store) => {
            return response.status(200).json({
              storeData: new_store,
              accountData: accountUP,
            });
          })
          .catch((err) => {
            return response.status(200).json({
              message: err.message,
            });
          });
      })
      .catch((err) => {
        return response.status(200).json({
          message: err.message,
        });
      });
  }
});

router.get('/getGeneralData' ,async (request, response)=>{
  console.log("status ok");
  const store = await Store.find();
  return response.status(200).json({
    stores: store,
    status : true
  })

});
module.exports = router;
