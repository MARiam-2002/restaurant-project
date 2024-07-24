import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createValidation = joi.object({
  name: generalFields.name,
  size: joi.number().positive().required(),
  path: joi.string().required(),
  filename: joi.string().required(),
  destination: joi.string().required(),
  mimetype: joi.string().required(),
  encoding: joi.string().required(),
  originalname: joi.string().required(),
  fieldname: joi.string().required(),})

 
