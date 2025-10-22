const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  item: String,
  price: Number,
});

module.exports = mongoose.model('Dish', dishSchema);