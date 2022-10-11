const joi = require('joi');

// Joi Category 
const categorySkeleton = {
  name: joi.string().min(1).max(15).trim().required().messages({
    "any.required": "please input a valid Name",
    "string.name":
      "please use name with minimum 1 characters and maximum 15 characters",
  }),
    url: joi.string().min(11).max(1024).required().messages({
      "any.required": "please input a valid Url",
      "string.url":
        "please use url with minimum 11 characters and maximum 1024 characters",
    }),
    alt: joi.string().min(3).max(15).required().messages({
      "any.required": "please input a valid alt",
      "string.alt":
        "please use alt with minimum 3 characters and maximum 15 characters",
    }),
};

const categorySchema = joi.object(categorySkeleton);

module.exports = {
    categorySchema
}