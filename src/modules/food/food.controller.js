import foodModel from "../../../DB/model/food.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const createFood = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.FOLDER_CLOUDINARY}/food`,
    }
  );
  const createFood = await foodModel.create({
    name,
    image: { id: public_id, url: secure_url },
  });
  return res.json({ success: true, result: createFood });
});
// export const getallProduct = asyncHandler(async (req, res, next) => {
//     if (req.params.categoryId) {
//       const category = await categoryModel.findById(req.params.categoryId);
//       if (!category) return next(new Error("category not found", { cause: 404 }));
//       const products = await productModel.find({
//         category: req.params.categoryId,
//       });
//       return res.json({ success: true, result: products });
//     }

//     const products = await productModel
//       .find({ ...req.query })
//       .pagination(req.query.page)
//       .customSelect(req.query.fields)
//       .sort(req.query.sort);
//     return res.json({ success: true, result: products });
//   });

export const getFood = asyncHandler(async (req, res, next) => {
  const foods = await foodModel.find({});
  res.json({ success: true, result: foods });
});
