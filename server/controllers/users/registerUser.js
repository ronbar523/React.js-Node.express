const Bcryptjs = require("../../config/bcrypt");
const UserModel = require("../../model/userModel");
const UserValidation = require("../../validation/userValidation");
require("dotenv").config();
const NodemailerJS = require('../../config/nodeMailer');
const logger = require("../../config/winston");




// Send Mail
function getMailForVerify(to) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Confirmation your account",
    html: verifyUser(to),
  };
}

// The Mail With Link
function verifyUser(to) {
     return `<a href='http://localhost:3000/verify_user/email=${to}'> Please Click Here To Confirm Your Account </a>`;
};


const registerUserController = async (req, res) => {
  try {
    // Check Validation
    const requestUser = await UserValidation.registerSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    // Hash Password
    requestUser.password = await Bcryptjs.createHash(requestUser.password);

    // Variable For Check If Email Existing
    const ifExistingEmailArr = await UserModel.findUserByEmail(
      requestUser.email
    );
    
      // Check if Email Existing
      if (ifExistingEmailArr.length != 0) {
        throw "Email it's exist";
      } else {
        let { email } = req.body;
        let options = getMailForVerify(email);
        NodemailerJS.transporter.sendMail(options, (err, info) => {
          if (err) {
            res.statusCode = 500;
            logger.fatal(err.message);
            res.json({ error: err.message });
          } else {
            res.statusCode = 200;
            res.json(info);
          }
        });

        await UserModel.createUser(
          requestUser.userName,
          requestUser.email,
          requestUser.password,
          requestUser.createdAt,
          requestUser.isAdmin,
          requestUser.biz,
          requestUser.block,
          requestUser.premium,
          requestUser.verify
        );
      }   

    res.json({
      status: 200,
      msg: "You've successfully registered",
      response: requestUser,
    });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  registerUserController,
};
