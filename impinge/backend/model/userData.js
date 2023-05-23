const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  jobtype: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("UserData", userSchema);
module.exports = userModel;
