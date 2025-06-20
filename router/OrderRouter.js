const express = require("express");
const AuthControl = require("../controller/AuthenticationController");
const stripe = require("stripe")(process.env.SECRET_KEY);
const Router = express.Router();

// Router.route("/checkoutSession/:id").get(
//   AuthControl.authenticateJWT,
//   OrderController.CheckOrder
// );

Router.post(
  "/create-checkout-session",
  AuthControl.authenticateJWT,
  async (req, res) => {
    try {
      console.log("Backend");
      const { products } = req.body;
      console.log(products);
      const lineitems = products.map((product) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: product.Book_id.name,
            images: [
              "https://www.pixelstalk.net/wp-content/uploads/2016/07/3840x2160-Images-Free-Download.jpg",
            ],
          },
          unit_amount: product.Book_id.price * 100,
        },
        quantity: product.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineitems,
        mode: "payment",
        success_url: "http://example.com/success",
        cancel_url: "http://localhost:5173/home/cart",
        customer_creation: "always", // optional, if you want Stripe to persist the customer
        billing_address_collection: "required",
      });

      res.json({ id: session.id });
    } catch (err) {
      console.error("Checkout session error:", err.message);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = Router;
