import cloudinary from "../../utils/cloudinary.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import bestFoodModel from '../../../DB/model/bestFood.model.js'
export const createBestFood = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;

  let createBestFoods = await bestFoodModel.create({
    title,
    description,
  });

  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `${process.env.FOLDER_CLOUDINARY}/bestFood`,
      }
    );
    createBestFoods.image = { id: public_id, url: secure_url };
    await createBestFoods.save();
  }
  return res.json({ success: true, result: createBestFoods});
});

export const getBestFood = asyncHandler(async (req, res, next) => {
  const bestFoods = await bestFoodModel.find({});
  res.json({ success: true, result: bestFoods });
});
