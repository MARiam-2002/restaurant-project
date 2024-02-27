import userModel from "../../../DB/model/User.model.js";
import mealModel from "../../../DB/model/meale.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const createMale = asyncHandler(async (req, res, next) => {
  const { title, offer, expired, price } = req.body;
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
    price,
  });
  return res.json({ success: true, status: 200, data: createMeal });
});

export const getMeal = asyncHandler(async (req, res, next) => {
  const mealsFav = await mealModel.find({ favourite: true });
  console.log(mealsFav);
  mealsFav.forEach(async (meal) => {
    meal.favourite = false;
    console.log(meal.favourite);
    await meal.save();
  });

  const meals = await mealModel.find({});

  res.json({ success: true, status: 200, data: meals });
});

export const redHeart = asyncHandler(async (req, res, next) => {
  const meal = await mealModel.findById(req.params.mealId);
  if (!meal) {
    return next(new Error("mealId not found", { cause: 404 }));
  }

  if (meal.favourite) {
    req.user.wishlist.pop(meal._id);
    await req.user.save();
    meal.favourite = false;
    await meal.save();
    return res.status(200).json({
      success: true,
      status: 200,
      message: "This meal is deleted from wishlist",
      data: meal,
    });
  }

  meal.favourite = true;
  await meal.save();

  req.user.wishlist.push(meal._id);
  await req.user.save();
  return res.status(200).json({
    success: true,
    status: 200,
    message: "This meal has been added to the wishlist",
    data: meal,
  });
});

export const wishlist = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id).populate("wishlist");

  return res.status(200).json({
    success: true,
    status: 200,
    message: "These are all the products that you added to the wishlist",
    data: user.wishlist,
  });
});
