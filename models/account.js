const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  password: String,
  mobile: String,
  avatarUrl: {
    type: String,
    default:
      "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
  },
  firstName: String,
  lastName: String,
  passcode: Number,
  createdAt: { type: Date, default: Date.now },
  isBusiness: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: false },
});
module.exports = mongoose.model("User", userSchema);