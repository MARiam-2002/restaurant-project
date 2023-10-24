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
