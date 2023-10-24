import { Router } from "express";
import * as mealController from "./meal.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
const router = Router();

router.post(
  "/createMeal",
  fileUpload(filterObject.image).single("meal"),
  mealController.createMale
);
router.get("/getallMeal", mealController.getMeal);
export default router;
