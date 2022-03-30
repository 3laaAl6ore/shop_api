//import express from 'express'; //another way
const express = require("express"); // same ^
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 5090;

// cors
app.use(cors());

// Routers
const accountsRouter = require("./controllers/accounts");
const storeRouter = require("./controllers/store");
const ProductRouter = require("./controllers/product");

app.use("/api/accounts", accountsRouter);
app.use("/api/store", storeRouter);
app.use("/api/product", ProductRouter);

const url =
  "mongodb+srv://shop_user:m52IqzYfCZhqwvs0@cluster0.qov5m.mongodb.net/shop_db?retryWrites=true&w=majority";
mongoose
  .connect(url)
  .then((res) => {
    console.log(res);
    app.listen(port, () => {
      console.log(`conected on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
