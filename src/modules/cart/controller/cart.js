import cartModel from "../../../../DB/model/cart.model.js";
import mealModel from "../../../../DB/model/meale.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

export const addMealInCart = asyncHandler(async (req, res, next) => {
  const { mealId, quantity } = req.body;

  if (req.user.wishlist.length > 0) {
    req.user.wishlist.map(async (id) => {
      let isMealInCart = await cartModel.findOne({
        user: req.user._id,
        "meals.mealId": id,
      });
      if (isMealInCart) {
        isMealInCart.meals.forEach((mealObj) => {
          if (mealObj.mealId.toString() === mealId.toString()) {
            mealObj.quantity = mealObj.quantity + quantity;
          }
        });

        await isMealInCart.save();
      } else {
        await cartModel.findOneAndUpdate(
          { user: req.user._id },
          { $push: { meals: { id, quantity } } },
          { new: true }
        );
      }

      req.user.wishlist = [];
      req.user.save();
      const cart = await cartModel.findOne({ user: req.user._id });
      return res.json({
        success: true,
        results: cart,
        message: "meal added successfully!",
      });
    });
  }

  const meal = await mealModel.findById(mealId);
  if (!meal) {
    return next(new Error("product not found ", { cause: 404 }));
  }

  let isMealInCart = await cartModel.findOne({
    user: req.user._id,
    "meals.mealId": mealId,
  });

  if (isMealInCart) {
    isMealInCart.products.forEach((mealObj) => {
      if (mealObj.mealId.toString() === mealId.toString()) {
        mealObj.quantity = mealModel.quantity + quantity;
      }
    });

    await isMealInCart.save();
    return res.json({
      success: true,
      results: isMealInCart,
      message: "meal added successfully!",
    });
  } else {
    const cart = await cartModel.findOneAndUpdate(
      { user: req.user._id },
      { $push: { meals: { mealId, quantity } } },
      { new: true }
    );
    return res.json({
      success: true,
      results: cart,
      message: "meal added successfully!",
    });
  }
});

export const getMealInCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel
    .findOne({ user: req.user._id })
    .populate("meals.mealId", " title image.url price offer expired");
  return res.json({
    success: true,
    results: cart,
  });
});

export const updateCart = asyncHandler(async (req, res, next) => {
  const { mealId, quantity } = req.body;

  const meal = await mealModel.findById(mealId);
  if (!meal) {
    return next(new Error("meal not found ", { cause: 404 }));
  }

  const cart = await cartModel.findOneAndUpdate(
    {
      user: req.user._id,
      "meals.mealId": mealId,
    },
    {
      $set: { "meals.$.quantity": quantity },
    },
    {
      new: true,
    }
  );
  return res.json({
    success: true,
    results: cart,
  });
});

export const removeMealFromCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOneAndUpdate(
    {
      user: req.user._id,
    },
    {
      $pull: { meals: { mealId: req.params.mealId } },
    },
    {
      new: true,
    }
  );
  return res.json({
    success: true,
    results: cart,
    message: "product deleted successfully!",
  });
});

export const clearCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOneAndUpdate({
    user: req.user._id,
    meals: [],
  });
  return res.json({
    success: true,
    results: cart,
    message: "Cart cleared successfully!",
  });
});
