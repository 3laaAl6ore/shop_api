const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  catagoryName: String,
  priority: Number,
  proudctName: String,
  storeID: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  catagoryID: { type: mongoose.Schema.Types.ObjectId, ref: "Catagory" },

  productImages: [
    {
      imageSource: String,
    },
  ],
  price: Number,
  discount: { type: Number, default: 0 },
  unitInStock: Number,
  desclimer: String,
  isAgeLimited: { type: Boolean, default: false },
});
module.exports = mongoose.model("Product", ProductSchema);
