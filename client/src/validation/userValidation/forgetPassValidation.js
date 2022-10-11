import joi from "joi-browser";

const forgetPassSchema = {
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
    })
    .trim()
    .required(),

};

export default forgetPassSchema;
