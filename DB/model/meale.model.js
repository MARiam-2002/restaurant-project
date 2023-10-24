import { Schema, model } from "mongoose";

const mealSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    offer: {
      type: Number,
      required: true,
    },
    expired: {
      type: String,
    },
    image: {
      id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const mealModel = model("Meal", mealSchema);
export default mealModel;
