import joi from "joi-browser";

const changePasswordSchema = {
  password: joi
    .string()
    .regex(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&]).{6,30}$")
    )
    .required(),

};

export default changePasswordSchema;
