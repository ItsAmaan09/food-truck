const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ma:rzCsIZNE9ucIgJ92@cluster0.blyqlak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB!")
  } catch (err) {
    console.log("MongoDB not connection erroe: ", err);
    process.exit(1);
  }
};

module.exports = connectDB;
