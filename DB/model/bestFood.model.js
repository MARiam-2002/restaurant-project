import { Schema, model } from "mongoose";

const bestFoodSchema = new Schema(
  {
    title: {
      type: String,
      min: 2,
      max: 30,
      required: true,
    },
    description: {
        type: String,
        min: 10,
        max: 100,
        required: true,
      },
    image: {
      id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const bestFoodModel = model("BestFood", bestFoodSchema);
export default bestFoodModel;
