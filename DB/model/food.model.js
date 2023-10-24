import { Schema, model } from "mongoose";

const foodSchema = new Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 20,
      required: true,
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

const foodModel = model("Food", foodSchema);
export default foodModel;
