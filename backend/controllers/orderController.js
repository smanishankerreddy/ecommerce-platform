const Order = require("../models/Order");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  const order = new Order({
    user: req.user._id, // comes from auth middleware
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    isPaid: false,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

module.exports = { addOrder, getMyOrders };
