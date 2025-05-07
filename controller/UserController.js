const user = require("../model/UserModel");
const userlogic=require("../Logic/UserLogic")

exports.getAllUsers = async (req, res) => {
  try {
    const findAll = await user.find({}).select("-_id -__v");
    // console.log(findAll)
    res.status(200).json(findAll);
    console.log(findAll);
  } catch (error) {
    console.log(res.body);
    res.status(500).json(error.message);
  }
};

exports.addUser = async (req, res) => {
  try {
    if (!req.body.id) {
      console.log(req.body);
      const { username, email, password } = req.body;
      const findAll = await user.find({});
      // userlogic.validateUser(findAll)
      const users = findAll[findAll.length - 1]
        ? findAll[findAll.length - 1]
        : 0;
      console.log("values", users.id);
      const st = users.id ? users.id : 0;
      const hashedPassword = await bcrypt.hash(password, 10);
      const adduser = { id: st + 1, username, email, password: hashedPassword };
       
      const addUser = await user.create(adduser);
      const userdata = { id: addUser.id, ...req.body };
      res.status(201).json(userdata);
    } else {
      await user.create(req.body);
      res
        .status(201)
        .json({ message: "User successfully registered", data: req.body });
    }
  } catch (error) {
    console.log(req.body);
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getuser = await user.findOne({ id }).select("-_id -__v");
    if (getuser) {
      res.status(200).json(getuser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const userdel = await user.findOneAndDelete({ id });
    console.log(userdel);
    if (!userdel) {
      res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log("delete");
    res.status(500).json(error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const updatebook = await user
      .findOneAndUpdate({ id }, req.body)
      .select("-_id -__v");
    if (!updatebook) {
      res.status(404).json({
        message: "User Not Found",
      });
    }
    res.status(200).json({
      message: "User updated succesfully",
      data: updatebook,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
