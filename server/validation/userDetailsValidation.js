const joi = require("joi");
 

const UserDetailsSkeleton = {
  firstName: joi.string().max(15).trim().required().messages({
    "any.required": "please input a valid First Name",
    "string.firstName": "please use first Name with maximum 15 characters",
  }),
  lastName: joi.string().max(15).trim().required().messages({
    "any.required": "please input a valid last Name",
    "string.lastName": "please use last Name with maximum 15 characters",
  }),
  phone: joi.string().min(9).max(10).trim().required().messages({
    "any.required": "please input a valid Phone Number",
    "string.phone":
      "please use phone with minimum 9 characters and maximum 10 characters",
  }),
  country: joi.string().max(15).trim().required().messages({
    "any.required": "please input a valid country",
    "string.country": "please use country with maximum 15 characters",
  }),
  state: joi.string().max(15).trim().required().messages({
    "any.required": "please input a valid state",
    "string.state": "please use state with maximum 15 characters",
  }),
  city: joi.string().max(15).trim().required().messages({
    "any.required": "please input a valid city",
    "string.city": "please use city with maximum 15 characters",
  }),
  address: joi.string().max(15).trim().required().messages({
    "any.required": "please input a valid address",
    "string.address": "please use address with maximum 15 characters",
  }),
  zipCode: joi.string().max(10).trim().required().messages({
    "any.required": "please input a valid zipCode",
    "string.zipCode": "please use zipCode with maximum 10 characters",
  }),
};

const userDetailsSchema = joi.object(UserDetailsSkeleton);

module.exports = {
  userDetailsSchema,
}; 