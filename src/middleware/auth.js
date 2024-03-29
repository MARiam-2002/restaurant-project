import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/errorHandling.js";
import userModel from "../../DB/model/User.model.js";
import tokenModel from "../../DB/model/Token.model.js";
import mealModel from "../../DB/model/meale.model.js";

const auth = asyncHandler(async (req, res, next) => {
  let token = req.headers["token"];
  if (!token) {
    
      return next();
    
  }
  const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE);
  if (!decoded?.id) {
    return res.json({ message: "In-valid token payload" });
  }
  const tokenDB = await tokenModel.findOne({ token, isValid: true });

  if (!tokenDB || !tokenDB.isValid) {
    return next(new Error("Token expired!"));
  }
  const authUser = await userModel.findById(decoded.id);
  if (!authUser) {
    return res.json({ message: "Not register account" });
  }
  req.user = authUser;
  return next();
});

export default auth;
