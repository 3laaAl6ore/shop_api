const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const isAuth = require("./isAuth");
const User = require("../models/account");
const Store = require("../models/store");
const Category = require("../models/catogory");
const Product = require("../models/product");

router.post("/addProduct", isAuth, async (request, response) => {
  const userID = request.account._id;
  const store = await Store.findOne({ associatedID: userID });
  const category = await Category.findOne({ storeId: store._id });
  const proudctID = mongoose.Types.ObjectId();
  const {
    catagoryName,
    priority,
    productImages,
    price,
    discount,
    unitInStock,
    desclimer,
    isLimited,
    proudctName,
  } = request.body;
  const _proudct = new Product({
    _id: proudctID,
    storeID: store._id,
    catagoryID: category._id,
    catagoryName: catagoryName,
    priority: priority,
    price: price,
    discount: discount,
    unitInStock: unitInStock,
    productImages: productImages,
    isLimited: isLimited,
    desclimer: desclimer,
    proudctName: proudctName,
  });

  _proudct
    .save()
    .then((newProduct) => {
      return response.status(200).json({
        message: newProduct,
      });
    })
    .catch((err) => {
      return response.status(200).json({
        message: err.message,
      });
    });
});
router.put("/updateProduct/:productId", isAuth, async (request, response) => {
  const pid = request.params.productId;
  Product.findById({ _id: pid })
    .then((product) => {
      const {
        catagoryName,
        priority,
        productImages,
        price,
        discount,
        unitInStock,
        desclimer,
        isLimited,
        proudctName,
      } = request.body;
      (product.catagoryName = catagoryName),
        (product.priority = priority),
        (product.productImages = productImages),
        (product.price = price),
        (product.discount = discount),
        (product.unitInStock = unitInStock),
        (product.desclimer = desclimer),
        (product.isLimited = isLimited),
        (product.proudctName = proudctName),
        product
          .save()
          .then((Proudct_Updated) => {
            return response.status(200).json({
              message: Proudct_Updated,
            });
          })
          .catch((error) => {
            return response.status(200).json({
              message: error.message,
            });
          });
    })
    .catch((error) => {
      return response.status(200).json({
        message: error.message,
      });
    });
});
router.delete(
  "/deleteProduct/:productId",
  isAuth,
  async (request, response) => {
    const pid = request.params.productId;
    Product.findByIdAndDelete({ _id: pid })
      .then((product) => {
        return response.status(200).json({
          message: product,
        });
      })
      .catch((error) => {
        return response.status(200).json({
          message: error.message,
        });
      });
  }
);
router.get("/getAllProduct", isAuth, async (request, response) => {
  const accountID = await request.account._id;
  const store = await Store.findOne({ associatedID: accountID });
  Product.find({ storeId: store._id })
    .then((Products) => {
      return response.status(200).json({
        message: Products,
      });
    })
    .catch((error) => {
      return response.status(200).json({
        error: error,
      });
    });
});
router.get(
  "/getProductByProductId/:ProductId",
  isAuth,
  async (request, response) => {
    const pid = request.params.ProductId;
    Product.find({ _id: pid })
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
