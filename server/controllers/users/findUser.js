const UserModel = require("../../model/userModel");


// Find All Users
const findAllUsersController = async (req,res) => {
  try{
    const userArr = await UserModel.findAllUser()
    res.json(userArr);
  } catch (err) {
    res.status(400).json({ err: err });
  }
}

// Find User By User Name
const findUserNameController = async (req, res) => {
  try {
    const { userName } = req.query;
    const user = await UserModel.findUserByUserName(userName);
    res.json(user);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

// Find All The Users That Verify
const findOnlyUsersVerifyController = async (req, res) => {
  try {
    const { verify } = req.query;
    const verifyUserArr = await UserModel.findOnlyVerifyUsers(verify);
    res.json(verifyUserArr);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

// Find All The Users That Blocked
const findOnlyUsersBlockController = async (req, res) => {
  try {
    const { block } = req.query;
    const blockedUserArr = await UserModel.findOnlyBlockUsers(block);
    res.json(blockedUserArr);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

// Find User By Email
const findUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await UserModel.findUserByEmail(email);
    console.log(email);
    res.json(user);
  } catch (err) {
    res.status(400).json({ err: err });
  }
}


module.exports = {
  findAllUsersController,
  findUserNameController,
  findOnlyUsersVerifyController,
  findOnlyUsersBlockController,
  findUserByEmail,
};