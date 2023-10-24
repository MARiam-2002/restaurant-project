import { Router } from "express";
import * as popularItemsController from "./popularItems.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
const router = Router();

router.post(
  "/createPopularItems",
  fileUpload(filterObject.image).single("item"),
  popularItemsController.createPopularItems
);
router.put(
  "/updatePopularItems/:id",
  fileUpload(filterObject.image).single("item"),
  popularItemsController.updatePopularItems
);
router.delete(
  "/deletedPopularItems/:id",
  popularItemsController.deletePopularItems
);
router.get("/getallPopularItems", popularItemsController.getPopularItems);
export default router;
