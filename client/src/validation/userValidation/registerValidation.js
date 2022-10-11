import joi from "joi-browser";

const registerSchema = {
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
    })
    .trim()
    .required(),
  

  userName: joi.string().min(2).max(10).trim().required(),

  password: joi
    .string()
    .regex(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&]).{6,30}$")
    )
    .required(),
};

export default registerSchema;
