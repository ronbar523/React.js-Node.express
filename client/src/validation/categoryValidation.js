import joi from "joi-browser";

const categorySchema = {
  name: joi.string().min(1).max(15).required(),
  url: joi.string().min(11).max(1024).required(),
  alt: joi.string().min(3).max(15).required()
};

export default categorySchema;