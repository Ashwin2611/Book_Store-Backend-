const mangoose = require("mongoose");
const { type } = require("os");
const validator = require("validator");

const UserSchema = mangoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide your name"],
  },
  age: {
    type: Number,
    trim: true,
    required: [true, "Please provide your age"],
  },
  gender: {
    type: String,
    required: [true, "Choose your gender"],
    enum: {
      values: ["male", "female"],
      message: "value should be either male or female",
    },
  },
  phoneno: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Please provide you contact number"],
  },
  userName: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide your email"],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Please Provide valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: [8, "Password must have 8 or more characters"],
    trim: true,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    trim: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password is not same!",
    },
  },
});

const UserModel = mangoose.model("User", UserSchema);

module.exports = UserModel;
