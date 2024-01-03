const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  // Connect to MongoDB
  mongoose.connect(MONGODB_URI);

  mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
  });
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
};

module.exports = connectDB;