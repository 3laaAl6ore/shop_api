const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const isAuth = require("./isAuth");
const User = require("../models/account");
const Store = require("../models/store");
const Catagory = require("../models/catogory");
const Product = require("../models/product");

router.post("/addProduct", isAuth, async (request, response) => {});

router.put("/updateProduct", isAuth, async (request, response) => {});

router.delete("/deleteProduct", isAuth, async (request, response) => {});

router.get("/getAllProduct", isAuth, async (request, response) => {});
module.exports = router;
