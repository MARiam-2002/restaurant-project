import popularItemsModel from "../../../DB/model/popularItems.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const createPopularItems = asyncHandler(async (req, res, next) => {
  const { title, price, place } = req.body;
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.FOLDER_CLOUDINARY}/popularItems`,
    }
  );
  const createPopularItems = await popularItemsModel.create({
    title,
    price,
    place,
    image: { id: public_id, url: secure_url },
  });
  return res.json({ success: true, result: createPopularItems });
});
export const updatePopularItems = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, price, place } = req.body;
  const popularItem = await popularItemsModel.findById({ _id: id });
  if (!popularItem) {
    return res.json({ message: "invalid-PopularItem" });
  }

  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    {
      public_id: popularItem.image.id,
    }
  );

  const newPopularItem = await popularItemsModel.findByIdAndUpdate(
    { _id: id },
    { title, price, place, image: { id: public_id, url: secure_url } },
    { new: true }
  );
  return res.json({ message: "updated", result: newPopularItem });
});

export const deletePopularItems = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const popularItem = await popularItemsModel.findById({ _id: id });
  if (!popularItem) {
    return res.json({ message: "invalid-PopularItem" });
  }

  await cloudinary.uploader.destroy(
    popularItem.image.id
  );

  const newPopularItem = await popularItemsModel.findByIdAndDelete({ _id: id });
  return res.json({ message: "deleted", result: newPopularItem });
});
export const getPopularItems = asyncHandler(async (req, res, next) => {
  const popularItems = await popularItemsModel.find({});
  res.json({ success: true, result: popularItems });
});
