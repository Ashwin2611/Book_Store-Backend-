const express = require("express");
const AuthControl = require("../controller/AuthenticationController");

const Router = express.Router();

// Router.route("/checkoutSession/:id").get(
//   AuthControl.authenticateJWT,
//   OrderController.CheckOrder
// );

Router.post(
  "/create-checkout-session",
  // AuthControl.authenticateJWT,
  async (req, res) => {
    try {
      const { products } = req.body;

      const lineitems = products.map((product) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineitems,
        mode: "payment",
        sucess_url: "",
        cancel_url: "",
      });

      res.json({ id: session.id });
    } catch (err) {
      console.error("Checkout session error:", err.message);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = Router;
