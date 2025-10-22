// services/dishService.js
const Dish = require('../models/Dish');

// Get all dishes
const getAllDishes = async () => {
  return await Dish.find();
};

// Add new dish
const addDish = async (dishData) => {
  const newDish = new Dish(dishData);
  return await newDish.save();
};

// Update dish
const updateDish = async (id, updatedData) => {
  return await Dish.findByIdAndUpdate(id, updatedData, { new: true });
};

// Delete dish
const deleteDish = async (id) => {
  return await Dish.findByIdAndDelete(id);
};

module.exports = {
  getAllDishes,
  addDish,
  updateDish,
  deleteDish
};
