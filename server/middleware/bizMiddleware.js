const Jwt = require("../config/jwt");
const UserModel = require("../model/userModel");


module.exports = async (req, res, next) => { 
 try {
    // Check If Have a Token
    req.jwtData = await Jwt.verifyToken(req.headers.token);

    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

    // Check If The User It's Biz Or Admin
    if (jwtUser[0].biz === true || jwtUser[0].isAdmin) {
      next();
    } else {
      throw "You Not biz or admin";
    }
  } catch (err) {
    res.status(401).json({ status: 401, msg: "you must to be biz or admin" });
  }
}
