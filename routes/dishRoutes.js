const express = require("express");
const Dish = require("../models/Dish");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});

router.post("/", verifyToken, async (req, res) => {
  const newDish = new Dish(req.body);
  const savedDish = await newDish.save();
  res.status(201).json(savedDish);
});

router.put("/:id", verifyToken, async (req, res) => {
  const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // returns updated dish
  });
  res.json(updatedDish);
});

router.delete("/:id", verifyToken, async (req, res) => {
  await Dish.findByIdAndDelete(req.params.id);
  res.json({ message: `Item ${req.params.id} removed.` });
});

module.exports = router;
