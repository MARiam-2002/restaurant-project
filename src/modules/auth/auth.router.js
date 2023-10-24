import { Router } from "express";
import * as authController from "./controller/registration.js";
import * as Validators from './auth.validation.js'
import { validation } from "../../middleware/validation.js";
const router = Router();

router.post("/signup",validation(Validators.registerSchema),authController.register);
router.post("/login",validation(Validators.login),authController.login);
router.get(
    "/confirmEmail/:activationCode",
    validation(Validators.activateSchema),
    authController.activationAccount
  );
export default router;
