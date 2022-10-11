const UserModel = require("../../model/userModel");
require("dotenv").config();
const NodemailerJS = require("../../config/nodeMailer");
const logger = require("../../config/winston");

// Send Mail
function getMailYourUserChangeToPremium(to) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Your User Become a Premium Account",
    html: getYourUserItsPremium(),
  };
}

// The Mail
function getYourUserItsPremium() {
  return `<h1> Your User Become A Premium Account </h1>`;
}

const becomePremiumUserController = async (req, res) => {
  try {
    
    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

    const update = req.body;
    
    const userID = jwtUser[0]._id;
    const email = jwtUser[0].email;
    let options = getMailYourUserChangeToPremium(email);
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
    await UserModel.becomePremiumUser(userID, update);
    res.json({ msg: "Your User Become a Premium Account" });
    
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  becomePremiumUserController,
};
