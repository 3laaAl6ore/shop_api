const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  associatedID :{ type: mongoose.Schema.Types.ObjectId, ref : 'User' },
  storeName:String,
  subs:[
    { 
       associatedID :{ type: mongoose.Schema.Types.ObjectId, ref : 'User'  }
    }
],
  isTakeAway: {type:Boolean, default:true},
  isDelivery: {type:Boolean, default:true},
  contactInfo:{
     email: String,
     mobile: String,
     phone: String,
     city: String,
     address: String,
     latitude: String,
     longtitude: String,
  },
  reviews:[
    {
        accountID:{ type: mongoose.Schema.Types.ObjectId, ref : 'User' },
        reviewContext:String,
        createdAt: { type: Date, default: Date.now },
        rank :Number,
        isPublished:{type:Boolean, default: false}
    },
  ],
  storeDescription: String,
  workingHours:[
    { 
        day:Number,
        fromHour: Number,
        ToHour: Number,
        isOpen:Boolean
    },
  ],
  logo: {
    type: String,
    default:
      "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
  },
  createdAt: { type: Date, default: Date.now },
  isLocked: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Store", storeSchema);
