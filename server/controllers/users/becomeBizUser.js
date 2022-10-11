const UserModel = require("../../model/userModel");
const logger = require("../../config/winston");
const NodemailerJS = require("../../config/nodeMailer");
require("dotenv").config();


// Send Mail
function getMailYourUserChangeToBiz(to) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Your Business Status Changed",
    html: getYourUserItsBiz(),
  };
}

// The Mail
function getYourUserItsBiz() {
  return `<h1> Your Business Status Changed </h1>`;
}


const becomeBizUserController = async (req, res) => {
  try {

    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

    const email = jwtUser[0].email;
    const update = req.body;
    
    let options = getMailYourUserChangeToBiz(email);
    NodemailerJS.transporter.sendMail(options, (err, info) => {
      if (err) {
        res.statusCode = 500;
        logger.fatal(err.message);
        res.json({ error: err.message });
      } else {
        res.statusCode = 200;
        res.json(info)
      }
    });
    await UserModel.becomeBizUser(email, update);
    res.json({ msg: "Your Biz Status Changed" });
    
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  becomeBizUserController,
};
