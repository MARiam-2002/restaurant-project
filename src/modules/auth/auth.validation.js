import joi from "joi";

export const registerSchema = joi
  .object({
    userName: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required(),
    confirmPassword: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .valid(joi.ref("password"))
      .required(),
  })
  .required();

export const activateSchema = joi
  .object({
    activationCode: joi.string().required(),
  })
  .required();

export const login = joi
  .object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required(),
  })
  .required();

export const forgetCode = joi
  .object({
    email: joi.string().email().required(),
  })
  .required();
export const verify = joi
  .object({
    forgetCode: joi.string().required(),
  })
  .required();

export const resetPassword = joi
  .object({
    password: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required(),
    confirmPassword: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .valid(joi.ref("password"))
      .required(),
  })
  .required();
