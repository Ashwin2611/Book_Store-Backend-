const cartmodel = require("../model/CartModel");
const bookmodel = require("../model/BookModel");
const usermodel = require("../model/UserModel");

exports.getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await FindObject(id, usermodel);

    const cart = await cartmodel
      .findOne({ user_id: userId })
      .select("-_id -__v")
      .populate("cartItems.Book_id");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const FindObject = async (id, model) => {
  const book = await model.find({});
  const book_id = book.find((val) => val.id == id);
  return book_id._id;
};

exports.addItem = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("User", id, req.params);
    const { Book_id } = req.body;
    const book_id = await FindObject(Book_id, bookmodel);
    const userId = await FindObject(id, usermodel);
    console.log("Book_id", await book_id);
    quantity = 1;

    let cart = await cartmodel.findOne({ user_id: userId });
    // console.log("Cart",cart)

    if (!cart) {
      console.log("Inside cart");
      cart = await cartmodel.create({
        user_id: userId,
        cartItems: [{ Book_id: book_id, quantity }],
      });
      res.status(200).json(cart);
    } else {
      const existingItem = cart.cartItems.find((item) =>
        item.Book_id.equals(book_id)
      );
      console.log("existingItem", existingItem);
      if (existingItem) {
        existingItem.quantity += quantity;
        cart.cartItems.find((item) => {
          if (item.Book_id.equals(existingItem.Book_id)) {
            console.log("Match")
            console.log(item.quantity,existingItem.quantity)
            item.quantity = existingItem.quantity;
            // return cart;
          }
        });
        console.log("cart", cart);
        const updateItem = await cartmodel.findOneAndUpdate(
          { user_id: userId },
          cart
        );
        console.log("UpdatedJson", updateItem);
        // res.status(200).json(updateItem);
      } else {

        cart.cartItems.push({ Book_id: book_id, quantity });
        const updateItem = await cartmodel.findOneAndUpdate(
            { user_id: userId },
            cart
          );
        console.log("UpdatedJson", updateItem);
        // res.status(200).json(updateItem);
      }
      res.status(200).json(cart)
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};


exports.removeItem=async(req,res)=>{
  try{
    const {Book_id}=req.body
    const {id}=req.params
    const userId=await FindObject(id,usermodel)
    const book_id=await FindObject(Book_id,bookmodel)
    const userCart=await cartmodel.findOne({user_id:userId})
    if(!userCart){
      res.status(404).json({
        message:"User cart not found"
      })
    }
    const BookItem=userCart.cartItems.some((Item)=>Item.Book_id.equals(book_id))
    console.log(BookItem)
    if(!BookItem){
      res.status(404).json({
        message:"Book not found in the cart"
      })
    }
    await cartmodel.updateOne({user_id:userId},{$pull:{cartItems:{Book_id:book_id}}})
    res.status(200).json({
      message:"Cart Updated Successfully"
    })

  }catch(error){
    res.status(500).json(error.message)
  }
}

exports.removeusercart=async(req,res)=>{
  try{
    const {id}=req.params
    const userId=await FindObject(id,usermodel)
    const userpres=await cartmodel.findOne({user_id:userId})
    if(!userpres){
      res.status(404).json({
        message:"User Cart is empty"
      })
    }
    await cartmodel.findOneAndDelete({user_id:userId})
    res.status(204).json({
      message:"User Cart is Empty"
    })
  }catch(error){
    res.status(500).json(error.message)
  }
}

exports.updateitem=async(req,res)=>{
  try{
    const {id}=req.params
    const {Book_id}=req.body
    const userId=await FindObject(id,usermodel)
    const bookId=await FindObject(Book_id,bookmodel)
    const user=await cartmodel.findOne({user_id:userId})
    if(!user){
      res.status(400).json({message:"Invalid user"})
    }
    let bookinx=user.cartItems.findIndex((data)=>data.Book_id.equals(bookId))
    const bookupd=user.cartItems[bookinx].quantity+=1;
    console.log(bookupd)
    
  }catch(error){
    res.status(500).json({message:error.message})
  }
}
