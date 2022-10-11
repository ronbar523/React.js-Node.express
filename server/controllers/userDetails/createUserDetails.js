const UserDetailsValidation = require("../../validation/userDetailsValidation")
const UserModel = require("../../model/userModel");
const UserDetailsModel = require("../../model/userDetailsModel");



const createUserDetailsController = async (req, res) => {
  try {
    const requestUserDetails =
    await UserDetailsValidation.userDetailsSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

    await UserDetailsModel.createUserDetails(
      requestUserDetails.firstName,
      requestUserDetails.lastName,
      requestUserDetails.phone,
      requestUserDetails.country,
      requestUserDetails.state,
      requestUserDetails.city,
      requestUserDetails.address,
      requestUserDetails.zipCode,
      jwtUser[0].id
    );
    res.json({ status: 200, msg: "work", response: requestUserDetails });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};


module.exports = {
  createUserDetailsController,
};