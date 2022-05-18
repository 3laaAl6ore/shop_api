const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const isAuth = require("./isAuth");
const User = require("../models/account");
const Store = require("../models/store");
const Catagory = require("../models/catogory");
const Product = require("../models/product");
// addCategory
router.post("/addCategory", isAuth, async (request, response) => {
  const userID = request.account._id;
  const store = await Store.findOne({ associatedID: userID });
  const catagoryID = mongoose.Types.ObjectId();
  const { catagoryName, priority, catagoryImage } = request.body;

  const _catagory = new Catagory({
    _id: catagoryID,
    storeId: store._id,
    catagoryName: catagoryName,
    priority: priority,
    catagoryImage: catagoryImage,
  });
  _catagory
    .save()
    .then((newCategory) => {
      return response.status(200).json({
        message: newCategory,
      });
    })
    .catch((err) => {
      return response.status(200).json({
        message: err,
      });
    });
});
// update Category
router.put("/updateCategory/:categoryId", isAuth, async (request, response) => {
  //const userID = request.account._id;
  const cid = request.params.categoryId;
  Catagory.findById({ _id: cid })
    .then((category) => {
      const { catagoryName, priority, catagoryImage } = request.body;
      category.catagoryName = catagoryName;
      category.priority = priority;
      category.catagoryImage = catagoryImage;
      category
        .save()
        .then((newCategory) => {
          return response.status(200).json({
            newDetalis: newCategory,
            oldDetalis: category,
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
});
// delete Category
router.delete(
  "/deleteCategory/:categoryId",
  isAuth,
  async (request, response) => {
    const cid = request.params.categoryId;
    Catagory.findByIdAndDelete(cid)
      .then((cat_delete) => {
        return response.status(200).json({
          message: cat_delete,
        });
      })
      .catch((error) => {
        return response.status(200).json({
          message: error.message,
        });
      });
  }
);
router.get("/getAllCategories/:storeID",  async (request, response) => {
  console.log("all in");
  const accountID =  request.params.storeID;
  const store = await Store.findById({ _id: accountID });
  Catagory.find({ storeId: store._id })
    .then((category) => {
      return response.status(200).json({
        status:true,
        All_categories: category,
      });
    })
    .catch((error) => {
      return response.status(200).json({
        error: error,
      });
    });
});

router.get(
  "/getCategoryByCategoryId/:categoryId",
  isAuth,
  async (request, response) => {
    const cid = request.params.categoryId;
    Catagory.find({ _id: cid })
      .then((category) => {
        return response.status(200).json({
          message: category,
        });
      })
      .catch((error) => {
        return response.status(200).json({
          error: error,
        });
      });
  }
);

module.exports = router;
