const express=require("express")
const AuthController=require("../controller/AuthenticationController")
const Authlogic=require("../Logic/UserLogic")

const router=express.Router();


router.route("/login").post(AuthController.login);
router.route("/register").post(Authlogic.ValidateState,AuthController.register)
module.exports=router;