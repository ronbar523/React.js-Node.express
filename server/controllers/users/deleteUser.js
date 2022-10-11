const UserModel = require("../../model/userModel");
const NodemailerJS = require("../../config/nodeMailer");
require("dotenv").config();
const ProductModel = require("../../model/productModel");
const UserDetailsModel = require("../../model/userDetailsModel");
const logger = require("../../config/winston");


// Send Mail
function getMailDeleteUser(to) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Your Account It's Deleted",
    html: DeleteUserMail(),
  };
}

// The Mail 
function DeleteUserMail() {
     return `<h1> Your Account It's Deleted </h1>`;
};


const deleteUserController = async (req, res) => {
  try {
    // Take The User Id From The URL
    const { id } = req.params;
    
    // Find The User By Email
    const user = await UserModel.findUserById(id)
    
    const createdBy = user._id.toString();
    
    let options = getMailDeleteUser(user.email);
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
    
    await UserModel.deleteUser(id);
    await ProductModel.deleteAllMyProducts(createdBy);
    await UserDetailsModel.deleteAllMyDetails(createdBy);
    res.json({ msg: "User Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ err: err });
  }
}

module.exports = {
    deleteUserController
}