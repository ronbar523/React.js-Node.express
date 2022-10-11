const UserDetailsModel = require("../../model/userDetailsModel");
const UserModel = require("../../model/userModel");


const deleteMyDetailsController = async (req,res) => {
  try {
    const { id } = req.params;
    const product = await UserDetailsModel.findById(id);

    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

    const userObjectIdString = product.createdBy.toString();

    const jwtUserObjectIdString = jwtUser[0]._id.toString();

    if (
      (jwtUserObjectIdString === userObjectIdString) ||
      (jwtUser[0].isAdmin === true)
    ) {
      await UserDetailsModel.deleteMyDetailsById(id);
      res.json({ msg: "Your Details Deleted Successfully" });
    } else {
      throw "It's not your Details";
    } 
  } catch (err) {
       res.status(400).json({ err: err });
    }
} 

module.exports = {
  deleteMyDetailsController,
};
