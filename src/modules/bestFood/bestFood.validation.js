import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createBestFood = {
  body: joi
    .object({
      title: joi.string().min(2).max(30).required(),
      description: joi.string().min(10).max(100).required(),
    })
    .required(),

  image: generalFields.file.required(),
};
