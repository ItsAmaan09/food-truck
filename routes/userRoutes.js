const express = require("express");
const { registerUser, loginUser } = require("../services/userService");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const user = await registerUser(req.body);

  res.json({ message: "Chef registered!", user });
});

// Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await loginUser(username, password);

  if (result.error) return res.status(400).json({ error: result.error });

  res.json({ message: "Welcome back, Chef!", token: result.token });
});

module.exports = router;
