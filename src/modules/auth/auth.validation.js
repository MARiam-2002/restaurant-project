import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const registerSchema = {
  body: joi
    .object({
      userName: joi.string().min(3).max(20).required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      confirmPassword: joi.string().valid(joi.ref("password")).required(),
    })
    .required(),
};
export const activateSchema = {
  params: joi
    .object({
      activationCode: joi.string().required(),
    })
    .required(),
};
export const login = {
  body: joi
    .object({
      email: generalFields.email.required(),
      password: generalFields.password.required(),
    })
    .required(),
};
