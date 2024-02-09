import joi from "joi";
import { validateObjectId } from "../../middleware/validation.js";

export const cartSchema = joi
  .object({
    productId: joi.string().custom(validateObjectId).required(),
    quantity: joi.number().integer().min(1).required(),
  })
  .required();

export const removeProductFromCart = joi
  .object({
    productId: joi.string().custom(validateObjectId).required(),
  })
  .required();
