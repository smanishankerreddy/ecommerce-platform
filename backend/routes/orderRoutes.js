const express = require("express");
const router = express.Router();
const { addOrder, getMyOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Create a new order
router.post("/", protect, addOrder);

// Get logged-in user's orders
router.get("/myorders", protect, getMyOrders);

module.exports = router;
