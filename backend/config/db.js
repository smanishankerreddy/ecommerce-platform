const mongoose = require("mongoose");

// MongoDB connection URI
const MONGO_URI = "mongodb://127.0.0.1:27017/ecommerce"; // Change if using cloud MongoDB

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Stop the server if DB connection fails
  }
};

module.exports = connectDB;

