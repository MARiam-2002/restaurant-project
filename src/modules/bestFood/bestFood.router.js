import { Router } from "express";
import * as bestFoodController from "./bestFood.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
const router = Router();
router.post(
  "/createBestFood",
  fileUpload(filterObject.image).single("image"),
  bestFoodController.createBestFood
);
router.get("/getBestFood", bestFoodController.getBestFood);
export default router;
