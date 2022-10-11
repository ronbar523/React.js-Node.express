const Nodemailer = require("nodemailer");
require("dotenv").config();

// Connect Gmail Account
const transporter = Nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

module.exports = {
    transporter
}