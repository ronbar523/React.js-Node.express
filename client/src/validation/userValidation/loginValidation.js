import joi from "joi-browser";

const loginSchema = {
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
    })
    .trim()
    .required(),

  password: joi
    .string()
    .regex(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&]).{6,30}$")
    )
    .required(),
};

export default loginSchema;
