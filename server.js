const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const PORT = 3000;

const app = express();

app.use(express.json());

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, "secretkey");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
}

mongoose
  .connect(
    "mongodb+srv://ma:rzCsIZNE9ucIgJ92@cluster0.blyqlak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log("MongoDB not connection erroe: ", err));


const dishSchema = new mongoose.Schema({
  item: String,
  price: Number,
});

const Dish = mongoose.model("Dish", dishSchema);

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await brypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, "secretkey", { expiresIn: "1h" });
};

const User = mongoose.model("User", userSchema);

// Register a new user
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: "Chef registered!" });
});

// Login user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ error: "No such chef found!" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Wrong password!" });

  const token = user.generateToken();
  res.json({ message: "Welcome back, Chef!", token });
});

app.get("/", (req, res) => {
  res.send("🍔 Welcome to Node Food Truck! Visit /menu to see what’s cooking.");
});

app.get("/menu", async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});

app.post("/menu", verifyToken, async (req, res) => {
  const newDish = new Dish(req.body);
  const savedDish = await newDish.save();
  res.status(201).json(savedDish);
});

app.put("/menu/:id", verifyToken, async (req, res) => {
  const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // returns updated dish
  });
  res.json(updatedDish);
});

app.delete("/menu/:id", verifyToken, async (req, res) => {
  await Dish.findByIdAndDelete(req.params.id);
  res.json({ message: `Item ${req.params.id} removed.` });
});

app.listen(PORT, () => {
  console.log(`Food truck running on http://localhost:${PORT}`);
});
