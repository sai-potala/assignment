const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema(
  {
    img: {
      data: Buffer,
      contentType: String,
      default:""
    },
    userInfo: {
      type: mongoose.Schema.Types.ObjectID ,ref:"User",
      required:true
    },
    title:{type:String,default:""},
    text:{type:String,default:""},
    imgLink:{type:String,default:''}
  },
  { timestamps: true, strict: false }
);

const Card = mongoose.model("card", cardSchema);

module.exports = Card;
