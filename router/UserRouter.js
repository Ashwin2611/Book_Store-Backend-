const express = require("express");
const Controller = require("../controller/UserController");
const AuthControl = require("../controller/AuthenticationController");
const Userlogic=require("../Logic/UserLogic")
const Router = express.Router();

Router.route("/getAllUsers").get(
  AuthControl.authenticateJWT,
  Controller.getAllUsers
);
Router.route("/addUser").post(AuthControl.authenticateJWT,Userlogic.validateUser, Controller.addUser);
Router.route("/getUser/:id").get(
  AuthControl.authenticateJWT,
  Controller.getUser
);
Router.route("/deleteUser/:id").delete(
  AuthControl.authenticateJWT,
  Controller.deleteUser
);
Router.route("/updateUser/:id").patch(
  AuthControl.authenticateJWT,
  Controller.updateUser
);
module.exports = Router;
