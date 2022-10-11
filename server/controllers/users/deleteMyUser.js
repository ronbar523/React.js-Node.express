const UserModel = require("../../model/userModel");
const ProductModel = require("../../model/productModel");
const UserDetailsModel = require("../../model/userDetailsModel");


const deleteMyUserController = async (req, res) => {
  try {
    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

    const jwtUserObjectIdString = jwtUser[0]._id.toString();

    await UserModel.deleteUser(jwtUser[0]._id);
    await ProductModel.deleteAllMyProducts(jwtUserObjectIdString);
    await UserDetailsModel.deleteAllMyDetails(jwtUserObjectIdString);
    res.json({ msg: "Your User, User Details, And Products Deleted Successfully" });
        
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  deleteMyUserController
};
