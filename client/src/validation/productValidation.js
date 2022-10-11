import joi from "joi-browser";

const productSchema = {
  name: joi.string().min(2).max(15).required(),
  url: joi.string().min(11).max(1024).required(),
  alt: joi.string().min(3).max(15).required(),
  category: joi.string().min(2).max(15).required(),
  description: joi.string().min(20).max(1024).required(),
  price: joi.number().min(1).max(1_000_000).required(),
  pieces: joi.number().min(1).max(1_000_000).required(),
};

export default productSchema;
