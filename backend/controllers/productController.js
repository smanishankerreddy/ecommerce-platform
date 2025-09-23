const Product = require("../models/Product");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// @desc    Add new product (Admin)
// @route   POST /api/products
// @access  Private/Admin
const addProduct = async (req, res) => {
  const { name, description, price, countInStock, category, image } = req.body;
  const product = new Product({
    name,
    description,
    price,
    countInStock,
    category,
    image,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

module.exports = { getProducts, getProductById, addProduct };
