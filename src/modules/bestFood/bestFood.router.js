import { Router } from "express";
import * as bestFoodController from "./bestFood.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./bestFood.validation.js";
const router = Router();
router.post(
  "/createBestFood",
  fileUpload(filterObject.image).single("image"),
  validation(validators.createBestFood),
  bestFoodController.createBestFood
);
router.get("/getBestFood", bestFoodController.getBestFood);
export default router;
