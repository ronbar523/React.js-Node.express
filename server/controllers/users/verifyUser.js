const UserModel = require("../../model/userModel");


const verifyUserController = async (req, res) => {
  try {
    const { email } = req.query;
    const update = req.body;
    await UserModel.verifyUser(email, update);
    res.json({ msg: "The account is approved" });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
    verifyUserController
}