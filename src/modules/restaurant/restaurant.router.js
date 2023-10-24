import { Router } from "express";
import * as restaurantController from "./restaurant.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
const router = Router();

router.post(
  "/createRestaurant",
  fileUpload(filterObject.image).fields([
    { name: "image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  restaurantController.createPopularItems
);
router.put(
  "/updateRestaurant/:id",
  fileUpload(filterObject.image).fields([
    { name: "image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  restaurantController.updateRestaurant
);
router.delete("/deleteRestaurant/:id", restaurantController.deleteRestaurant);
router.get("/getRestaurant", restaurantController.getRestaurants);
export default router;
