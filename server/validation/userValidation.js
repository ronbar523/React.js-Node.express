const joi = require("joi");

const emailRole = {
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
    })
    .trim()
    .required()
    .messages({
      "any.required": "please input a valid Email",
      "string.email": "please use mail",
    }),
};

const userNameRole = {
  userName: joi.string().min(2).max(10).trim().required().messages({
    "any.required": "please input a valid User Name",
    "string.userName":
      "please use User Name with minimum 2 characters and maximum 10 characters",
  }),
};

const passwordRole = {
  password: joi
    .string()
    .regex(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&]).{6,30}$")
    )
    .required()
    .messages({
      "any.required": "please input a valid Password",
      "string.password":
        "please use password with minimum 6 characters and maximum 30 characters And use at least one sign, one number, one uppercase letter, and one lowercase letter",
    }),
};


const kindUserRole = {
  biz: joi.boolean(),
  block: joi.boolean(),
  premium: joi.boolean(),
  isAdmin: joi.boolean(),
  verify: joi.boolean(),
};

const secretNum = {
  num: joi.number().min(100_000).max(999_999).required(),
};


const registerSkeleton = {
  ...emailRole,
  ...userNameRole,
  ...passwordRole,
  ...kindUserRole
}

const loginSkeleton = {
  ...emailRole,
  ...passwordRole
}

const emailSkeleton = {
  ...emailRole,
};

const newEmailSkeleton = {
  ...emailRole
}


const restAndNewPasswordSkeleton = {
  ...emailRole,
  ...passwordRole,
  ...secretNum
}

const newPasswordSkeleton = {
  ...passwordRole,
};




const registerSchema = joi.object(registerSkeleton);
const loginSchema = joi.object(loginSkeleton);
const emailSchema = joi.object(emailSkeleton);
const newEmailSchema = joi.object(newEmailSkeleton);
const newPassSchema = joi.object(newPasswordSkeleton);
const restAndPassSchema = joi.object(restAndNewPasswordSkeleton);


module.exports = {
  registerSchema,
  loginSchema,
  emailSchema,
  newEmailSchema,
  newPassSchema,
  restAndPassSchema,
};
