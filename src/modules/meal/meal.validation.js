import joi from "joi";
import { validateObjectId } from "../../middleware/validation.js";
export const mealId = joi
  .object({
    mealId: joi.string().custom(validateObjectId),
  })
  .required();