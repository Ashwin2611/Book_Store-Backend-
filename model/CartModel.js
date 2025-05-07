const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  
    required: [true, "User ID is required"]
  },
  cartItems: [
    {
      Book_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "book",
        required: [true, "Book ID is required"]
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity cannot be less than 1"]
      }
    }
  ]
}, { timestamps: true });  

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
