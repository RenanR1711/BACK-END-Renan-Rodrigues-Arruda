const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  birtday: {
    type: String,
    require: true,
  },
  location: {
    address: { type: String },
    number: { type: Number },
    city: { type: String },
    state: { type: String },
  },
  wallet: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
