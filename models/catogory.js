const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catagorySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  catagoryName: String,
  priority: Number,
  storeID :{ type: mongoose.Schema.Types.ObjectId, ref : 'Store' },
  catagoryImage: {
    type: String,
    default:
      "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
  },

});
module.exports = mongoose.model("Catagory", catagorySchema);
