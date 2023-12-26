import restaurantModel from "../../../DB/model/resturant.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const createPopularItems = asyncHandler(async (req, res, next) => {
  const { name, offer, review, status, speed } = req.body;
  let createPopularRestaurantItems;
  createPopularRestaurantItems = await restaurantModel.create({
    name,
    offer,
    speed,
    review,
    status,
  });
  if (req.files.image) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.files.image[0].path,
      {
        folder: `${process.env.FOLDER_CLOUDINARY}/restaurants/image`,
      }
    );
    createPopularRestaurantItems.image={ id: public_id, url: secure_url };
    await createPopularRestaurantItems.save();


  }
  if (req.files.logo) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.files.logo[0].path,
      {
        folder: `${process.env.FOLDER_CLOUDINARY}/restaurants/logo`,
      }
    );
    createPopularRestaurantItems.logo = { id: public_id, url: secure_url };
    await createPopularRestaurantItems.save();
  }
  return res.json({ success: true, result: createPopularRestaurantItems });
});

export const updateRestaurant = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, speed, offer, status, review } = req.body;
  const restaurantItem = await restaurantModel.findById({ _id: id });
  if (!restaurantItem) {
    return res.json({ message: "invalid-restaurantItem" });
  }
  let newPopularRestaurantItems;
  if (req.files.image) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.files.image[0].path,
      {
        public_id: restaurantItem.image.id,
      }
    );
    newPopularRestaurantItems = await restaurantModel.findByIdAndUpdate(
      { _id: id },
      {
        name,
        offer,
        speed,
        review,
        status,
        image: { id: public_id, url: secure_url },
      },
      { new: true }
    );
  }
  if (req.files.logo) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.files.logo[0].path,
      {
        public_id: restaurantItem.logo.id,
      }
    );

    newPopularRestaurantItems.logo = { id: public_id, url: secure_url };
    await newPopularRestaurantItems.save();
  }
  return res.json({ message: "updated", result: newPopularRestaurantItems });
});

export const deleteRestaurant = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await restaurantModel.findById({ _id: id });
  if (!restaurant) {
    return res.json({ message: "invalid-restaurant" });
  }

  const ids = [restaurant.image.id, restaurant.logo.id];
  const result = await cloudinary.api.delete_resources(ids);

  const deleteRestaurant = await restaurantModel.findByIdAndDelete({ _id: id });
  return res.json({ message: "deleted", result: deleteRestaurant });
});

export const getRestaurants = asyncHandler(async (req, res, next) => {
  const restaurant = await restaurantModel.find({});
  res.json({ success: true, result: restaurant });
});
