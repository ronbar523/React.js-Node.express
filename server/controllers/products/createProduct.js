const ProductModel = require("../../model/productModel");
const ProductValidation = require("../../validation/productValidation");
const UserModel = require("../../model/userModel");
const NodemailerJS = require('../../config/nodeMailer')
require("dotenv").config();
const logger = require("../../config/winston");



// Send Mail
function getMailAfterCreatedProduct(to, userName, productName) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: `${userName} you product created!`,
    html: getConfirmProduct(userName, productName),
  };
}

// The Mail
function getConfirmProduct(userName, productName) {
  return `<h1>Hey ${userName} </h1> <br> <h3> You created a new product: ${productName}</h3>`;
};

const createProductController = async (req, res) => {
  try {
    const requestProduct = await ProductValidation.productSchema.validateAsync(
      req.body,
      {
        abortEarly: false,
      }
    );



    
    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);
    
    const productName = requestProduct.name
    
    const email = jwtUser[0].email;
    const userName = jwtUser[0].userName;

    let options = getMailAfterCreatedProduct(email, userName, productName);
    NodemailerJS.transporter.sendMail(options, (err, info) => {
      if (err) {
        res.statusCode = 500; 
        logger.fatal(err.message);
        res.json({ error: err.message });
      } else {
        רes.statusCode = 200;
        res.json(info);
      }
    });
      
    await ProductModel.createProduct(
      requestProduct.name,
      requestProduct.description,
      requestProduct.pieces,
      requestProduct.price,
      requestProduct.category,
      requestProduct.url,
      requestProduct.alt,
      requestProduct.quantity,
      jwtUser[0].id
    );
        
    res.json({ status: 200, msg: "work", response: requestProduct });
  
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  createProductController,
};
