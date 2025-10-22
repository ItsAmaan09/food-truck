const express = require("express");
const {
  getAllDishes,
  addDish,
  updateDish,
  deleteDish,
} = require("../services/dishService");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const dishes = await getAllDishes();
  res.json(dishes);
});

router.post("/", verifyToken, async (req, res) => {
  const saved = await addDish(req.body);
  res.status(201).json(saved);
});

router.put("/:id", verifyToken, async (req, res) => {
  const updated = await updateDish(req.params.id, req.body);
  res.json(updated);
});

router.delete("/:id", verifyToken, async (req, res) => {
  await deleteDish(req.params.id);
  res.json({ message: `Item ${req.params.id} removed.` });
});

module.exports = router;
