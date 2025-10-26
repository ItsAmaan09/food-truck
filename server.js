require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const dishRoutes = require("./routes/dishRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(
  express.json({
    origin: ["https://food-truck-wtwh.vercel.app/"], // your actual frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
connectDB();

app.get("/", (req, res) => res.send("🍔 Welcome to Food Truck API!"));

app.use("/menu", dishRoutes);

app.use("/user", userRoutes);

app.listen(PORT, () =>
  console.log(`Food truck running on http://localhost:${PORT}`)
);
