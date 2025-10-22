const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const PORT = 3000;

const app = express();

app.use(express.json());

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

app.get("/", (req, res) => {
  res.send("🍔 Welcome to Node Food Truck! Visit /menu to see what’s cooking.");
});

app.get("/menu", async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});

app.post("/menu", async (req, res) => {
  const newDish = new Dish(req.body);
  const savedDish = await newDish.save();
  res.status(201).json(savedDish);
});

app.put("/menu/:id", async (req, res) => {
  const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // returns updated dish
  });
  res.json(updatedDish);
});

app.delete("/menu/:id", async (req, res) => {
  await Dish.findByIdAndDelete(req.params.id);
  res.json({ message: `Item ${req.params.id} removed.` });
});

app.listen(PORT, () => {
  console.log(`Food truck running on http://localhost:${PORT}`);
});
