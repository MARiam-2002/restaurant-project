import bestFoodModel from "../../../DB/model/bestFood.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const createBestFood = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.FOLDER_CLOUDINARY}/bestFood`,
    }
  );
  const createBestFood = await bestFoodModel.create({
    title,
    description,
    image: { id: public_id, url: secure_url },
  });
  return res.json({ success: true, result: createBestFood });
});

export const getBestFood = asyncHandler(async (req, res, next) => {
    const bestFoods = await bestFoodModel.find({});
    res.json({ success: true, result: bestFoods });
  });