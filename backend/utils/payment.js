const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_yourkey");

// Create a payment intent
const createPaymentIntent = async (amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createPaymentIntent };
