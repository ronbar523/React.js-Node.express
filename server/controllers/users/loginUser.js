const UserValidation = require("../../validation/userValidation");
const Bcryptjs = require("../../config/bcrypt");
const UserModel = require("../../model/userModel");
const Jwt = require("../../config/jwt");

const loginUserController = async (req, res) => {
  try {
    // Check Validation
    const requestLogin = await UserValidation.loginSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    // Find User By Email
    const ifEmailIsFilledOut = await UserModel.findUserByEmail(
      requestLogin.email
    );
   
    // Check If Email Existing
    if (ifEmailIsFilledOut.length != 0) {
      // If The Email Existing Compare The Password
      const rightPassword = await Bcryptjs.compareHash(
        requestLogin.password,
        ifEmailIsFilledOut[0].password
      );


      if (rightPassword === true) {
        // If The Password True Check If The User Verify
        if (ifEmailIsFilledOut[0].verify === true) {
          // If The User Verify Check If The User doesn't Block
          if (ifEmailIsFilledOut[0].block === false) {
            // If The User Doesn't Block Create Token
            const token = await Jwt.createToken({
              email: requestLogin.email,
              _id: ifEmailIsFilledOut[0]._id,
              isAdmin: ifEmailIsFilledOut[0].isAdmin,
              biz: ifEmailIsFilledOut[0].biz,
              premium: ifEmailIsFilledOut[0].premium,
            });

            res.json({
              status: 200,
              msg: `Welcome Back ${ifEmailIsFilledOut[0].userName}`,
              token: token,
            });
          } else {
            // If The User Is Block
            throw "Your User Is Block";
          }
        } else {
          // If The User is Not Verify
          throw "Your user is not verify";
        }
      } else {
        // If The Password Wrong
        throw "Wrong Password";
      }

    } else {
      // If The Email Not Existing
      throw "The Email Not Existing";
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  loginUserController,
};
