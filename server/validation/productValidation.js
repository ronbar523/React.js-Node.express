const joi = require("joi");

// Joi Product
const productSkeleton = {
  name: joi.string().min(2).max(10).trim().required().messages({
    "any.required": "please input a valid Name",
    "string.name":
      "please use name with minimum 1 characters and maximum 10 characters",
  }),

  category: joi.string().min(2).max(15).trim().required().messages({
    "any.required": "please input a valid Category",
    "string.category":
      "please use category with minimum 1 characters and maximum 10 characters",
  }),

  description: joi.string().min(20).max(204).trim().required().messages({
    "any.required": "please input a valid Description",
    "string.description":
      "please use description with minimum 20 characters and maximum 204 characters",
  }),

  pieces: joi.number().min(0).max(1_000_000).required().messages({
    "any.required": "please input a valid Pieces",
    "string.pieces":
      "please use pieces with minimum 1 pieces and maximum 1,000,000 pieces",
  }),

  price: joi.number().min(1).max(1_000_000).required().messages({
    "any.required": "please input a valid price",
    "string.price":
      "please use price with minimum 1 and maximum 1,000,000 price",
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

const productSchema = joi.object(productSkeleton);

module.exports = {
  productSchema,
};
