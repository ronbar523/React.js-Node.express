const UserDetailsModel = require("../../model/userDetailsModel");
const UserModel = require("../../model/userModel");


const deleteAllMyUserDetailsController = async (req, res) => {
  try {
    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

    const jwtUserObjectIdString = jwtUser[0]._id.toString();
    await UserDetailsModel.deleteAllMyDetails(jwtUserObjectIdString);
    res.json({ msg: "All Your Details Deleted Successfully" });
    
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  deleteAllMyUserDetailsController,
};