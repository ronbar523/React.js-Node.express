const UserModel = require("../../model/userModel");
require("dotenv").config();
const NodemailerJS = require("../../config/nodeMailer");
const Bcryptjs = require("../../config/bcrypt");
const UserValidation = require("../../validation/userValidation");
const RandomNumber = require("../../util/randomNumber");
const logger = require("../../config/winston");

// Send Mail
function getMailForRestPassword(to, num) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Reset your password",
    html: getPassRestLink(to, num),
  };
}

// The Mail With Link
function getPassRestLink(to, num) {
  return `<a href='http://localhost:3000/rest_password/${to}/${num}'> Reset password </a>`;
}

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
  return `<h1> Your Password is Changed </h1>`;
}

const restUserPasswordController = async (req, res) => {

  try{
  const validatedValue = await UserValidation.emailSchema.validateAsync(req.body)

  const user = await UserModel.findUserByEmail(validatedValue.email);
  
  if(user.length > 0) {
     const num = RandomNumber(100_000, 999_999);

    // 30 * 60 * 1000 = 1_800_800 = 30 mins
     const expDate = new Date(Date.now() + 1_800_000);

     await UserModel.updateRecoveryParams(validatedValue.email, num, expDate);
     let options = getMailForRestPassword(validatedValue.email, num);
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
  res.json({
    status: 200,
    msg: "We send you a email with link to reset the password",
    response: validatedValue,
  });
  } else {
    throw "The email doesn't exist in the system";
  }
  } catch (err){
    res.status(400).json({ status: 400, err: err });
  }
}

const changeUserPasswordController = async (req, res) => {
  try {

    const validatedValue = await UserValidation.restAndPassSchema.validateAsync(
      { ...req.body, ...req.params },
      { abortEarly: false }
    );
    const user = await UserModel.findUserByEmail(validatedValue.email);
       
    if(user.length > 0) {
      
      if(user[0].randomSecureNumber == validatedValue.num){
        const nowDT = new Date()
        
        if(nowDT.getTime() <= user[0].dateSecureNumber.getTime()){
          const hashPassword = await Bcryptjs.createHash(
            validatedValue.password
          );
          await UserModel.updatePassword(validatedValue.email, hashPassword);
          res.json({ msg: "password updated" });
          let options = getMailYourPasswordChange(validatedValue.email);
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
        } else {
          throw "The Link It's Expired"
        }
      } else {
        throw "The random number it's wrong"
      }
    } else {
      throw "The user it's not exist"
  } 
}catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
}


module.exports = {
  restUserPasswordController,
  changeUserPasswordController,
};

