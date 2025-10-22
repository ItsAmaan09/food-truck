const express = require("express");
const connectDB = require("./config/db");
const dishRoutes = require("./routes/dishRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

connectDB();

app.get("/", (req, res) => res.send("🍔 Welcome to Food Truck API!"));

app.use("/menu", dishRoutes);

app.use("/user", userRoutes);

app.listen(PORT, () =>
  console.log(`Food truck running on http://localhost:${PORT}`)
);
