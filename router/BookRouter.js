const express=require("express")
const controller=require("../controller/BookController")
const AuthControl=require("../controller/AuthenticationController")
const upload=require("../MulterConfig")
const router=express.Router();

router.route("/getAllBook").get(AuthControl.authenticateJWT,controller.getAllProduct)
router.route("/addBook").post(AuthControl.authenticateJWT,upload.single("image"),controller.addBook)
router.route("/getBook/:id").get(AuthControl.authenticateJWT,controller.getBook) 
router.route("/deleteBook/:id").delete(AuthControl.authenticateJWT,controller.deleteBook)
router.route("/updateBook/:id").patch(AuthControl.authenticateJWT,upload.single("image"),controller.updateBook)
router.route("/updateBook/:id").put(AuthControl.authenticateJWT,controller.updateDocument)
router.route("/deleteAll").delete(AuthControl.authenticateJWT,controller.deleteAll)
router.route("/:id").get(AuthControl.authenticateJWT,controller.searchbook)
module.exports=router;