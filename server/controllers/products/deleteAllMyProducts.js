const ProductModel = require("../../model/productModel");
const UserModel = require("../../model/userModel");
const NodemailerJS = require("../../config/nodeMailer");
require("dotenv").config();
const logger = require("../../config/winston");


// Send Mail
function getMailAfterDeleteAllProducts(to, userName) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: `${userName} you products deleted!`,
    html: getMailDeleteAllProducts(userName),
  };
}

// The Mail
function getMailDeleteAllProducts(userName) {
  return `<h1>Hey ${userName} </h1> <br> <h3> You deleted your products </h3>`;
}



const deleteAllMyProductsController = async (req, res) => {
  try {

    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

    const email = jwtUser[0].email;
    const userName = jwtUser[0].userName;
    let options = getMailAfterDeleteAllProducts(email, userName);
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
    const jwtUserObjectIdString = jwtUser[0]._id.toString();
    await ProductModel.deleteAllMyProducts(jwtUserObjectIdString);
    res.json({ msg: "All Your Products Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};



module.exports = {
  deleteAllMyProductsController,
};