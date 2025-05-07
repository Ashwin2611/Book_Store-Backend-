const express=require("express")
const router=express.Router();
const Controller=require("../controller/CartController")
const AuthController=require("../controller/AuthenticationController")

router.route("/:id").get(AuthController.authenticateJWT,Controller.getItem)
router.route("/:id").post(AuthController.authenticateJWT,Controller.addItem)
router.route("/removeItem/:id").post(AuthController.authenticateJWT,Controller.removeItem)
router.route("/removeUsercart/:id").delete(AuthController.authenticateJWT,Controller.removeusercart) 
router.route("/update/:id").patch(AuthController.authenticateJWT,Controller.updateitem)

module.exports=router;


