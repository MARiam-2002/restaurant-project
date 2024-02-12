import userModel from "../../../../DB/model/User.model.js";
import cartModel from "../../../../DB/model/cart.model.js";
import mealModel from "../../../../DB/model/meale.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const addMealInCart = asyncHandler(async (req, res, next) => {
  const { mealId, quantity } = req.body;

  // if (req.user.wishlist.length > 0) {
  //   req.user.wishlist.map(async (id) => {
  //     let isMealInCart = await cartModel.findOne({
  //       user: req.user._id,
  //       "meals.mealId": id,
  //     });
  //     if (isMealInCart) {
  //       isMealInCart.meals.forEach((mealObj) => {
  //         if (mealObj.mealId.toString() === id.toString()) {
  //           mealObj.quantity = mealObj.quantity + quantity;
  //         }
  //       });

  //       await isMealInCart.save();
  //     } else {
  //       await cartModel.findOneAndUpdate(
  //         { user: req.user._id },
  //         { $push: { meals: { id, quantity } } },
  //         { new: true }
  //       );
  //     }

  //     req.user.wishlist = [];
  //     req.user.save();
  //     const cart = await cartModel.findOne({ user: req.user._id });
  //     return res.json({
  //       success: true,
  //       results: cart,
  //       message: "meal added successfully!",
  //     });
  //   });
  // }
  const user = await userModel.findOne({ email: req.user.email });

  const meal = await mealModel.findById(mealId);
  if (!meal) {
    return next(new Error("product not found ", { cause: 404 }));
  }

  let isMealInCart = await cartModel.findOne({
    user: user._id,
    "meals.mealId": mealId,
  });

  if (isMealInCart) {
    isMealInCart.meals.forEach((mealObj) => {
      if (mealObj.mealId.toString() === mealId.toString()) {
        mealObj.quantity = mealObj.quantity + quantity;
      }
    });

    await isMealInCart.save();
    return res.json({
      success: true,
      data: {
        message: "meal added successfully!",
        results: isMealInCart,
      },
    });
  } else {
    const cart = await cartModel.findOneAndUpdate(
      { user: user._id },
      { $push: { meals: { mealId, quantity } } },
      { new: true }
    );
    return res.json({
      success: true,
      data: {
        message: "meal added successfully!",
        results: cart,
      },
    });
  }
});

export const addWhishlist = asyncHandler(async (req, res, next) => {
  if (req.user.wishlist.length > 0) {
    const user = await userModel.findOne({ email: req.user.email });
    console.log(user);
    user.wishlist.map(async (id) => {
      let isMealInCart = await cartModel.findOne({
        user: user._id,
        "meals.mealId": id,
      });
      const meal = await mealModel.findById(id);
      meal.favourite = false;
      await meal.save();
      if (isMealInCart) {
        isMealInCart.meals.forEach((mealObj) => {
          if (mealObj.mealId.toString() === id.toString()) {
            mealObj.quantity = +mealObj.quantity + 1;
          }
        });

        await isMealInCart.save();
      } else {
        await cartModel.findOneAndUpdate(
          { user: req.user._id },
          { $push: { meals: { mealId: id, quantity: 1 } } },
          { new: true }
        );
      }
    });
    const cart = await cartModel.findOne({ user: user._id });

    user.wishlist = [];
    await user.save();
    return res.json({
      success: true,
      data: {
        results: cart,
        message: "meals of wishList added successfully!",
      },
    });
  } else {
    return res.json({
      success: false,
      data: {
        message: "whish List is Empty go to add favourite !",
      },
    });
  }
});
export const getMealInCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel
    .findOne({ user: req.user._id })
    .populate("meals.mealId", " title image.url price offer expired");
  return res.json({
    success: true,
    data: { cart },
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

  if(!cart){
    return next(new Error("mealId not found in the cart to update ", { cause: 404 }));

  }
  return res.json({
    success: true,
    data: { cart },
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
    data: {
      message: "product deleted successfully!",
      results: cart,
    },
  });
});

export const clearCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { meals: [] },
    { new: true }
  );
  return res.json({
    success: true,
    data: {
      message: "Cart cleared successfully!",
      results: cart,
    },
  });
});
