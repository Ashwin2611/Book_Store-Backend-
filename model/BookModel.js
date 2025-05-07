const mongoose=require("mongoose");
const { type } = require("os");
const BookSchema=mongoose.Schema({
    id: {
        type: Number,
        unique: true 
    },
    name:{
        type:String,
        required:[true,"Please Provide the bookname"]
    },
    authorName:{
        type:String,
        required:[true,"Please Provide the authorName"]
    },
    publishedYear:{
        type:String,
        required:[true,"Please Provide the PublishYear"]
    },
    price:{
        type:Number,
        required:[true,"Please Provide the price of the book"]
    },
    genres:{
        type:[String],
        require:[true,"Please Provide book genres"],
        enum:{
            values:['mystery','romance','sci-fi','non-fiction','Fantasy','Horror'],
            message:"Genres either:mystery, romance, sci-fi, non-fiction, Ho or Fantasy"
        }
    },
    rating:{
        type:Number,
        default:3.0,
        required:[true,"Please Provide rating"],
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },image: {
        type: String,
        required: false
    }
})
const BookModel=mongoose.model("book",BookSchema);

module.exports=BookModel;