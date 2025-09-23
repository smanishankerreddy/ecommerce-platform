const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin route
router.post("/", protect, admin, addProduct);

module.exports = router;
