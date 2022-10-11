const UserModel = require("../../model/userModel");
const UserDetailsModel = require("../../model/userDetailsModel");
const UserDetailsValidation = require("../../validation/userDetailsValidation")

const updateUserDetailsController = async (req, res) => {
    try {
        const { id } = req.params;
        
        const userDetails = await UserDetailsModel.findById(id);

        const requestUserDetails = await UserDetailsValidation.userDetailsSchema.validateAsync(req.body, { abortEarly: false });

        const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

        const userObjectIdString = userDetails.createdBy.toString();
        
        const jwtUserObjectIdString = jwtUser[0]._id.toString();

        if(jwtUserObjectIdString === userObjectIdString){
            await UserDetailsModel.updateUserDetailsById(id, requestUserDetails);
            res.json({ msg: "User Details Updated Successfully" });
        }  else {
            throw "It's not your User Details";
        }
    } catch (err) {
       res.status(400).json({ err: err });
    }
};

module.exports = {
  updateUserDetailsController,
};