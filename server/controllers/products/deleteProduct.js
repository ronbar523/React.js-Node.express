const ProductModel = require("../../model/productModel");
const UserModel = require("../../model/userModel");
const NodemailerJS = require("../../config/nodeMailer");
const logger = require("../../config/winston");
require("dotenv").config();


// Send Mail
function getMailAfterDeleteProduct(to, userName) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: `${userName} you product deleted!`,
    html: getMailDeleteProduct(userName),
  };
}

// The Mail
function getMailDeleteProduct(userName) {
  return `<h1>Hey ${userName} </h1> <br> <h3> You deleted your product </h3>`;
}


const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await ProductModel.findProductById(id);

    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);
    
    const userObjectIdString = product.createdBy.toString();

    const jwtUserObjectIdString = jwtUser[0]._id.toString();
    const email = jwtUser[0].email;
    const userName = jwtUser[0].userName;

    console.log(userName)
    
    if (jwtUserObjectIdString === userObjectIdString || jwtUser[0].isAdmin === true ) {
      await ProductModel.deleteProductById(id);
      if(jwtUserObjectIdString === userObjectIdString ){
      let options = getMailAfterDeleteProduct(email, userName);
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
    }
    await ProductModel.deleteProductById(id);
    res.json({ msg: "Product Deleted Successfully" });
    } else {
      throw "It's not your product and you are not the Admin"
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
};


module.exports = {
  deleteProductController,
};
