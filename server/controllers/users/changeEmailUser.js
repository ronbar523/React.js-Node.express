const UserModel = require("../../model/userModel");
require("dotenv").config();
const NodemailerJS = require("../../config/nodeMailer");
const UserValidation = require("../../validation/userValidation");
const logger = require("../../config/winston");


// Send Mail
function getMailYourEmailChange(to) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Your Email changed",
    html: getConfirmChangeEmail(),
  };
}

// The Mail
function getConfirmChangeEmail() {
  return `<h1> Your Email Changed</h1>`;
}

const changeUserEmailController = async (req, res) => {
  try {
    const { email } = await UserValidation.newEmailSchema.validateAsync(req.body);

    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

    // Check If The Email Existing
    const ifExistingEmailArr = await UserModel.findUserByEmail(email);

    if(ifExistingEmailArr == 0) {
      const id = jwtUser[0].id;
      await UserModel.changeEmailUser(id, email);
      res.json({ msg: "The email changed" });
      let options = getMailYourEmailChange(email);
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
    } else {
      throw "The New Email Is Existing"
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  changeUserEmailController,
};
