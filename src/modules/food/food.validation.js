import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createValidation = {
  body: joi
    .object({
      name: generalFields.name,
    })
    .required(),

//   file: joi
//     .object({
//       foods: generalFields.file.required(),
//     })
//     .required(),
};
