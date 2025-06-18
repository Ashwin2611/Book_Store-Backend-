// const CartModel = require("../model/CartModel");
// const usermodel=require("../model/UserModel")
// exports.CheckOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = await FindObject(id, usermodel);

//     const cart = await CartModel
//       .findOne({ user_id: userId })
//       .select("-_id -__v")
//       .populate("cartItems.Book_id");

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }
//   } catch (err) {}
// };
// const FindObject = async (id, model) => {
//   const book = await model.find({});
//   const book_id = book.find((val) => val.id == id);
//   return book_id._id;
// };
