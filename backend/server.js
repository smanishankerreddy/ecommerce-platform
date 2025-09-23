const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Allow frontend to access API
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("E-Commerce Backend Running");
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
