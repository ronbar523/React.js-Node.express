const ProductModel = require("../../model/productModel");
const ProductValidation = require("../../validation/productValidation");
const UserModel = require("../../model/userModel");
const NodemailerJS = require("../../config/nodeMailer");
const logger = require("../../config/winston");
require("dotenv").config();



// Send Mail
function getMailAfterUpdateProduct(to, userName) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: `${userName} you product updated!`,
    html: getMailUpdateProduct(userName),
  };
}

// The Mail
function getMailUpdateProduct(userName) {
  return `<h1> Hey ${userName} </h1> <br> <h3> You updated your product </h3>`;
}


const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findProductById(id);

    const requestProduct = await ProductValidation.productSchema.validateAsync(req.body, {
      abortEarly: false,
    });
      
    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

    const userObjectIdString = product.createdBy.toString();
        
    const jwtUserObjectIdString = jwtUser[0]._id.toString();
    const email = jwtUser[0].email;
    const userName = jwtUser[0].userName;
    if (
      jwtUserObjectIdString === userObjectIdString ||
      jwtUser[0].isAdmin === true
    ) {
      let options = getMailAfterUpdateProduct(email, userName);
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
    await ProductModel.updateProduct(id, requestProduct);
    res.json({ msg: "Product updated successfully" });
    } else {
      throw "It's not your product and you are not the Admin";
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  updateProductController,
};