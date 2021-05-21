const  mongoose =  require("mongoose")
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, reqired: true },
    password: { type: String, required: true},
    isAdmin: { type: Boolean, default: false },
    image: { type: String, default: "" },
    cardData: { type: Array, default: [] },
  },
  { timestamps: true, strict: false }
);

const User = mongoose.model("user", userSchema);

module.exports =  User;
