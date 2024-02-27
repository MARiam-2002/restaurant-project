import { Router } from "express";
import * as mealController from "./meal.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
import auth from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./meal.validation.js";
const router = Router();

router.post(
  "/createMeal",
  fileUpload(filterObject.image).single("meal"),
  mealController.createMale
);
router.put(
  "/redHeart/:mealId",
  auth,
  validation(validators.mealId),
  mealController.redHeart
);
router.get("/wishlist", auth, mealController.wishlist);
router.get("/getallMeal", mealController.getMeal);
export default router;
