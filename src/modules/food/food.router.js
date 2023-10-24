import { Router } from "express";
import { fileUpload, filterObject } from "../../utils/multer.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./food.validation.js";
import * as foodController from "./food.controller.js";
const router = Router();
router.post(
  "/searchFood",
  fileUpload(filterObject.image).single("foods"),
  validation(validators.createValidation),
  foodController.createFood
);
router.get("/getallFood", foodController.getFood);
export default router;
