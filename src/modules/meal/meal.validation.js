import joi from "joi";
import { validateObjectId } from "../../middleware/validation.js";

export const mealId = joi
  .object({
    productId: joi.string().custom(validateObjectId),
  })
  .required();