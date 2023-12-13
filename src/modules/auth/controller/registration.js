import bcryptjs from "bcryptjs";
import crypto from "crypto";
import signupTemp from "../../../utils/generateHtml.js";
import { generateToken } from "../../../utils/GenerateAndVerifyToken.js";
import userModel from "../.././../../DB/model/User.model.js";
import sendEmail from "../../../utils/email.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const register = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;
  const isUser = await userModel.findOne({ email });
  if (isUser) {
    return next(new Error("email already registered !", { cause: 409 }));
  }

  const hashPassword = bcryptjs.hashSync(
    password,
    Number(process.env.SALT_ROUND)
  );
  const activationCode = crypto.randomBytes(64).toString("hex");

  const user = await userModel.create({
    userName,
    email,
    password: hashPassword,
    activationCode,
  });

  const link = `https://restaurant-project-drab.vercel.app/auth/confirmEmail/${activationCode}`;

  const isSent = await sendEmail({
    to: email,
    subject: "Activate Account",
    html: signupTemp(link),
  });
  return isSent
    ? res.json({ success: true, message: "Please review Your email!" })
    : next(new Error("something went wrong!"));
});
export const activationAccount = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOneAndUpdate(
    { activationCode: req.params.activationCode },
    { isConfirmed: true, $unset: { activationCode: 1 } }
  );

  if (!user) {
    return next(new Error("User Not Found!", { cause: 404 }));
  }

  return res.send(
    "Congratulation, Your Account is now activated, try to login"
  );
});
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new Error("Invalid-Email", { cause: 400 }));
  }

  if (!user.isConfirmed) {
    return next(new Error("Un activated Account", { cause: 400 }));
  }

  const match = bcryptjs.compareSync(password, user.password);

  if (!match) {
    return next(new Error("Invalid-Password", { cause: 400 }));
  }

  const token = generateToken({
    payload: { id: user._id, email: user.email },
    signature: process.env.TOKEN_SIGNATURE,
    expiresIn: "2d",
  });

  user.status = "online";
  await user.save();

  return res.json({ success: true, result: token });
});
//send forget Code
