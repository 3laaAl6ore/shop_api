//import express from 'express'; //another way
const express = require("express"); // same ^
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 5090;

const accountsRouter = require("./controllers/accounts");
app.use("/api/accounts", accountsRouter);
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
