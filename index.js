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
const CatagoryRouter = require("./controllers/catagory");

app.use("/api/accounts", accountsRouter);
app.use("/api/store", storeRouter);
app.use("/api/product", ProductRouter);
app.use("/api/catagory", CatagoryRouter);

const Myurl = "mongodb+srv://shop_user:m52IqzYfCZhqwvs0@cluster0.qov5m.mongodb.net/shop_db?retryWrites=true&w=majority" ;
const Aleurl = "mongodb+srv://kiosk_user:mPfFB6de1GkUzMEf@cluster0.cxcp4.mongodb.net/kiosk_db?retryWrites=true&w=majority" ;

mongoose
  .connect(Aleurl)
  .then((res) => {
    console.log(res);
    app.listen(port, () => {
      console.log(`conected on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
