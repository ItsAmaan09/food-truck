const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Password hash before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await brypt.hash(this.password, 10);
  next();
});

// Generate JWT token
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = mongoose.model('User',userSchema);