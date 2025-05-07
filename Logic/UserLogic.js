const usermodel=require("../model/UserModel")

exports.validateUser=async(req,res,next)=>{
    try{
        const findAll=await usermodel.find({});
        const userval=req.body
        const findUser=findAll.find((user)=>user.userName==userval.userName);
        if(!findUser){
            res.status(400).json({
                message:"Invalid User"
            })
        }
        next();
    }catch(err){
        res.status(500).json({
            message:err.message 
        })
    }
    
}


exports.ValidateState=async(req,res,next)=>{
    try{
        console.log("after validate")
        const userdatas=await usermodel.find({});
        console.log("userdata",userdatas)
        console.log(req.body)
        const {userName}=req.body
        const filteruser=userdatas.find((user)=>user.userName===userName)
        console.log(filteruser)
        if(filteruser){
            res.status(400).json("User already exist")
        }else{
            next(); 
        }
    }catch(error){
        console.log(error.message)
        // next();
        res.status(500).json({message:error.message}) 
    }
}

exports.ErrorHandler=(msg)=>{
    console.log("Error",typeof(msg))
    if(msg.includes("duplicate")){
        if(msg.includes("email")){
            return "This email is already exist"
        }
        else if(msg.includes("phoneno")){
            return "This phoneno is already exist"
        }
        else if(msg.includes("username")){
            return "This username is already exist"
        }
    }
}