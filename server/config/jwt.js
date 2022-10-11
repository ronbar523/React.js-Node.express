const jwt = require("jsonwebtoken");
require("dotenv").config();


// Create Token For Login
const createToken = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, process.env.jwtSecretKey, { expiresIn: "7d" }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.jwtSecretKey, (err, decoded) => {
          if (err) reject(err);
          else resolve(decoded);
        });
    })
}


module.exports = {
  createToken,
  verifyToken,
};