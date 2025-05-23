const UserModel = require("../model/UserModel");
const usersModel = require("../model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ErrorHandler } = require("../Logic/UserLogic");

const SECRET_KEY =
  process.env.JWT_SECRET ||
  "f1a2e3b4c5d6e7f8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2";
exports.login = async (req, res) => {
  try {
    console.log("REquest")
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Please provide both username and password",
      });
    }

    const users = await usersModel.find({});
    const user = users.find((e) => e.userName == username);
    // console.log(user);
    // console.log("Password", password, user.password);
    // console.log("Username", user.userName, username);
    if (!user) {
      return res.status(404).json({
        message: "Invalid, Login User not found",
      });
    } 
    else if (!(await bcrypt.compare(password, user.password))){ 
      return res.status(400).json({
        message: "Invalid User Credentials",
      });
    }
    const token = jwt.sign({ username: user.userName }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      token,
      id:user.id
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.register = async (req, res) => {
  try {
    if (!req.body.id) {
      const { password } = req.body;
      console.log("Before validate")
      // ValidateState(req.body);
      const userData = await usersModel.find({});
      const userId = userData[userData.length - 1]
        ? userData[userData.length - 1].id
        : 0;
      console.log(userId);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { id: userId + 1, ...req.body, password: hashedPassword ,passwordConfirm:hashedPassword};
      await UserModel.create(user);
      return res.status(201).json({
        message: user,
      });
    } else {
      return res.status(404).json({
        message: "ID should not be provided by user",
      });
    }
  } catch (error) {
    console.log(error.message)
    const errormessage=ErrorHandler(error.message)
    return res.status(500).json({message:errormessage});
  }
};

// Middleware to Verify JWT
exports.authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    // console.log("Request: ",req,req.user)
    next();
  });
};


// const ValidateState=async(data)=>{
//   try{
//       console.log("after validate")
//       const userdatas=await UserModel.find({});
//       console.log("userdata",userdatas)
//       console.log(data)
//       // const users=req.body
//       // console.log("Number",users.userName)
//       const filteruser=userdatas.find((user)=>user.userName===data.userName)
//       console.log(filteruser)
//       if(filteruser){
//           res.status(400).json("User already exist")
//       }
//   }catch(error){
//       console.log(error.message)
//       res.status(500).json({message:error.message})
//       // next();
//   }
// }
