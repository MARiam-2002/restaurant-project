import userModel from "../../../DB/model/User.model.js";
import mealModel from "../../../DB/model/meale.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const createMale = asyncHandler(async (req, res, next) => {
  const { title, offer, expired } = req.body;
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.FOLDER_CLOUDINARY}/meal`,
    }
  );
  const createMeal = await mealModel.create({
    title,
    offer,
    expired,
    image: { id: public_id, url: secure_url },
  });
  return res.json({ success: true, result: createMeal });
});

export const getMeal = asyncHandler(async (req, res, next) => {
  const meals = await mealModel.find({});
  res.json({ success: true, result: meals });
});

export const redHeart = asyncHandler(async (req, res, next) => {
  const meal = await mealModel.findById(req.params.mealId);
  if (!meal) {
    return next(new Error("mealId not found", { cause: 404 }));
  }
  const user = await userModel.findById(req.user._id);

  if (meal.favourite) {
    meal.favourite = false;
    await meal.save();
    user.wishlist.pop(meal._id);
    await user.save();
    return res.status(200).json({
      success: true,
      message: "This meal is deleted from wishlist",
      result: meal,
    });
  }
  meal.favourite = true;
  await meal.save();

  user.wishlist.push(meal._id);
  await user.save();
  return res.status(200).json({
    success: true,
    message: "This meal has been added to the wishlist",
    result: meal,
  });
});

export const wishlist = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);

  return res.status(200).json({
    success: true,
    message: "These are all the products that you added to the wishlist",
    results: user.wishlist,
  });
});

