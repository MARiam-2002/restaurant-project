import { Router } from "express";
import * as cartController from "./controller/cart.js";
import * as validators from "./cart.validation.js";
import { validation } from "../../middleware/validation.js";
import auth from "../../middleware/auth.js";
const router = Router();

router.post(
  "/",
  auth,
  validation(validators.cartSchema),
  cartController.addMealInCart
);
router.post(
  "/whishlist",
  auth,
  cartController.addWhishlist
);
router.get("/", auth, cartController.getMealInCart);

router.patch("/clear", auth, cartController.clearCart);
router.patch(
  "/",
  auth,
  validation(validators.cartSchema),
  cartController.updateCart
);
router.patch(
  "/:mealId",
  auth,
  validation(validators.removeMealFromCart),
  cartController.removeMealFromCart
);

export default router;
