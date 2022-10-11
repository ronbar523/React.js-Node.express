const UserModel = require("../../model/userModel");
require("dotenv").config();
const NodemailerJS = require("../../config/nodeMailer");
const logger = require("../../config/winston");


// Send Mail After Blocked
function getMailAfterBlockUser(to) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Your account is blocked",
    html: BlockUserMail(to),
  };
}

// The Mail After Block
function BlockUserMail() {
  return `<h1> Your account is blocked </h1>`;
};


// Send Mail After UnBlocked
function getMailAfterUnBlockUser(to) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Your account is unblocked",
    html: UnBlockUserMail(),
  };
}

// The Mail After UnBlock
function UnBlockUserMail() {
  return `<h1> Your account is unblocked </h1>`;
};


const blockUserController = async (req, res) => {
  try {
    // Take The User Id From The URL
    const { id } = req.params;

    const updateBlock = req.body;

    // Find The User By Email
    const user = await UserModel.findUserById(id);

    // If The User Blocked Now
    if (updateBlock.block === true) {
      let options = getMailAfterBlockUser(user.email);
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
      await UserModel.blockUser(id, updateBlock);
      res.json({ msg: "The user is blocked" });
    }
    // If The User UnBlocked Now
    else {
      let options = getMailAfterUnBlockUser(user.email);
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
      await UserModel.blockUser(id, updateBlock);
      res.json({ msg: "The user is unblocked" });
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  blockUserController,
};