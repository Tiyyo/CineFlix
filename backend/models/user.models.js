const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    default: null,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  admin: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("user", userSchema);
