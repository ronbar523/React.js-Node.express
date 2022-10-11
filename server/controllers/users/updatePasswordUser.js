const UserModel = require("../../model/userModel");
require("dotenv").config();
const NodemailerJS = require("../../config/nodeMailer");
const Bcryptjs = require("../../config/bcrypt");
const UserValidation = require("../../validation/userValidation");
const logger = require("../../config/winston");



// Send Mail
function getMailYourPasswordChange(to) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Your password is changed",
    html: getConfirmChangePassword(),
  };
}

// The Mail
function getConfirmChangePassword() {
  return `<h1> Your Password Is Changed </h1>`;
}

const changeUserPasswordController = async (req, res) => {
  try {

    const { password } = await UserValidation.newPassSchema.validateAsync(
      req.body
    );

    const jetUser = await UserModel.findUserByEmail(req.jwtData.email);

    const email = jetUser[0].email

    await Bcryptjs.createHash(password).then((hashedPass) => {
      UserModel.updateUserPassword(email, hashedPass)
        .then((updateRes) => {
        let options = getMailYourPasswordChange(email);
        NodemailerJS.transporter.sendMail(options, (err, info) => {
          if (err) {
            res.statusCode = 500;
            logger.fatal(err.message);
            res.json({ error: err.message });
          } else {
            res.statusCode = 200;
            res.json({ msg: updateRes });
          }
        });
      })
      .catch((e) => {
        res.statusCode = 500;
        logger.fatal(err.message);
        res.json({ msg: "Error" });
        });
    });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  changeUserPasswordController,
};
