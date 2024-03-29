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
  if (req.user) {
    const meals = await mealModel.find({});
    const user = await userModel.findOne({ email: req.user.email });
    meals.forEach(async (meal) => {
      const isLiked = user.wishlist.includes(meal._id);
      console.log(isLiked);
      if (!isLiked) {
        meal.favourite = false;
        await meal.save();
      }
    });
    res.json({ success: true, status: 200, data: meals });
  } else {
    const meals = await mealModel.find({});
    if (meals.length > 0) {
      meals.forEach(async (meal) => {
        meal.favourite = false;
        await meal.save();
      });
      res.status(200).json({ success: true, status: 200, data: meals });
    }
  }
});

export const redHeart = asyncHandler(async (req, res, next) => {
  let meal = await mealModel.findById(req.params.mealId);
  if (!meal) {
    return next(new Error("mealId not found", { cause: 404 }));
  }

  if (meal.favourite) {
    const user = await userModel.findById(req.user._id);
    const index = user.wishlist.indexOf(meal._id);
    if (index !== -1) {
      user.wishlist.splice(index, 1);
    }
    await user.save();
    meal.favourite = false;
    await meal.save();
    return res.status(200).json({
      success: true,
      status: 200,
      message: "This meal is deleted from wishlist",
      data: meal,
    });
  }
  const user = await userModel.findById(req.user._id);

  meal.favourite = true;
  await meal.save();

  user.wishlist.push(meal._id);
  await user.save();
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
