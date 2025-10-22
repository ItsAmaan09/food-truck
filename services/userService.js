// services/userService.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) return { error: 'No such chef found!' };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { error: 'Wrong password!' };

  const token = user.generateToken();
  return { token };
};

module.exports = { registerUser, loginUser };
