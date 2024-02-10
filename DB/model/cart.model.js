import mongoose, { Schema, Types, model } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    meals: [
      {
        _id: false,
        mealId: {
          type: Types.ObjectId,
          ref: "Meal",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const cartModel = mongoose.models.cartModel || model("Cart", cartSchema);
export default cartModel;
